/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol } from 'esri/symbols';
import { SimpleRenderer } from 'esri/renderers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  @Output() labels = new EventEmitter<any[]>();

  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _propertyLayer: string = 'https://mapstest.raleighnc.gov/arcgis/rest/services/Property/MapServer/0';
  private _addressLayer: string = 'https://maps.raleighnc.gov/arcgis/rest/services/Energov/DataMap_Energov/MapServer/1';

  private _zoom: number = 10;
  private _distance: number = 10;
  private _property:esri.FeatureLayer;
  private _mapView:esri.MapView;
  private _selectedProperty:esri.Graphic;


  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap: string = 'streets';

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }
  @Input()
  set distance(distance: number) {
    this._distance = distance;
  }

  get distance(): number{
    return this._distance;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  

  constructor(private router:Router, private route: ActivatedRoute, private shared:SharedService) { }

  async initializeMap() {
    try {
      const [EsriMap, EsriMapView, Search, FeatureLayer, FeatureLayerSearchSource, geometryEngine, Graphic, SimpleFillSymbol, SimpleMarkerSymbol] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/Search',
        'esri/layers/FeatureLayer',
        'esri/widgets/Search/FeatureLayerSearchSource',
        'esri/geometry/geometryEngine',
        'esri/Graphic',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleMarkerSymbol'
      ]);

      // Set type of map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // Set type of map view
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };

      const mapView: esri.MapView = new EsriMapView(mapViewProperties);
      this._mapView = mapView;
      const search: esri.widgetsSearch = new Search({view: mapView, includeDefaultSources: false, resultGraphicEnabled: false});
      // All resources in the MapView and the map have loaded.
      // Now execute additional processes
      mapView.when(() => {
        let property: esri.FeatureLayer = new FeatureLayer(this._propertyLayer);
        this._property = property;
        let addresses: esri.FeatureLayer = new FeatureLayer(this._addressLayer);
        mapView.map.addMany([property, addresses]);
        search.sources.push(this.getSource(addresses, FeatureLayerSearchSource, 'ADDRESS', 'Address Point', "", "Search by address" ));
        mapView.ui.add(search, {position: 'top-left', index: 0});
        search.on('select-result', event => {
          property.queryFeatures({returnGeometry: true, outFields: ['*'], 
          geometry: event.result.feature.geometry, 
          outSpatialReference: mapView.spatialReference}).then(result => {
            if (result.features.length > 0) {
              this._selectedProperty = result.features[0];
              this.bufferProperty(mapView, property, result.features[0], geometryEngine, Graphic, SimpleFillSymbol);
            }
          });

        });
        mapView.whenLayerView(addresses).then((layerView:esri.LayerView) => {

          (addresses.renderer as SimpleRenderer).symbol = new SimpleMarkerSymbol({
            style: "circle",
            color: [0,0,0, .4],
            size: "8px",  // pixels
            outline: {  // autocasts as new SimpleLineSymbol()
              color: "white",
              width: 1  // points
            }
          });


 
        });
        mapView.whenLayerView(property).then((layerView:esri.LayerView) => {
          (property.renderer as SimpleRenderer).symbol = new SimpleFillSymbol(
            {
               style: "none",
               outline: {  // autocasts as new SimpleLineSymbol()
                 color: "white",
                 width: 1
               }
             });
            
          if (this.route.routeConfig) {
              if (this.route.routeConfig.path === 'pin/:pin') { 
                this.route.paramMap.subscribe(params => {
                  property.queryFeatures({returnGeometry: true, outFields: ['*'], 
                  where: "PIN_NUM = '" + params.get('pin') + "'" , 
                  outSpatialReference: mapView.spatialReference}).then(result => {
                    if (result.features.length > 0) {
                      this._selectedProperty = result.features[0];
                      this._mapView.goTo(this._selectedProperty);
                      this.bufferProperty(mapView, property, result.features[0], geometryEngine, Graphic, SimpleFillSymbol);
                    }
                  });
                });
              } else if (this.route.routeConfig.path === 'address/:address') {
                this.route.paramMap.subscribe(params => {

                  search.search(params.get('address'));
                });
              }
            }
          });
        });


    } catch (error) {
      console.log('We have an error: ' + error);
    }

  }

  bufferProperty (mapView, property, selectedProperty, geometryEngine, Graphic, SimpleFillSymbol) {

    let buffer = geometryEngine.buffer(selectedProperty.geometry, this._distance, 'feet');


    let g:esri.Graphic = new Graphic();
    g.geometry = buffer;
    let symbol:esri.SimpleFillSymbol = new SimpleFillSymbol(
    {
       color: [ 51,51, 204, 0 ],
       style: "solid",
       outline: {  // autocasts as new SimpleLineSymbol()
         color: "red",
         width: 2
       }
     });
     g.symbol = symbol;
     mapView.graphics.removeAll();
    mapView.graphics.add(g);
    property.queryFeatures({returnGeometry: true, outFields:['OWNER', 'ADDR1', 'ADDR2', 'ADDR3', 'OBJECTID'], geometry:g.geometry, orderByFields:['SITE_ADDRESS']}).then(result => {
     let oids = [];

     result.features.forEach(f => {
       oids.push(f.attributes.OBJECTID);
     });
     let labelatts = [];
     property.queryRelatedFeatures({objectIds: oids, relationshipId: 0, 
       outFields:['OWNER', 'ADDR1', 'ADDR2', 'ADDR3'],
       outSpatialReference: mapView.spatialReference}).then(relates => {
       result.features.forEach(f => {
         relates[f.attributes.OBJECTID].features.forEach(condo => {
           
           if (!this.checkDuplicate(labelatts, condo.attributes)) {
            labelatts.push(condo.attributes);
           } else {
             console.log(condo.attributes)
           }
           f.symbol = new SimpleFillSymbol(
            {
               color: [ 51,51, 204, 0 ],
               style: "solid",
               outline: {  // autocasts as new SimpleLineSymbol()
                 color: "yellow",
                 width: 1
               }
             });
           mapView.graphics.add(f);

         });

       });
       this.shared.labels.next(labelatts);
       mapView.goTo({target: result.features}, {duration: 2000});

     });
    });
  }

  checkDuplicate(attributeList:any[], attributes: any) {
    let duplicateFound:boolean = false;
    attributeList.forEach(a => {
      if (a.OWNER === attributes.OWNER && a.ADDR1 === attributes.ADDR1 && a.ADDR2 === attributes.ADDR2 && a.ADDR3 === attributes.ADDR3) {
        duplicateFound = true;
      }
    });
    return duplicateFound;
  }
  getSource (layer: esri.Layer, FeatureLayerSearchSource: any, displayField: string, name: string, where: string, placeholder: string): esri.FeatureLayerSearchSource {
    let source: esri.FeatureLayerSearchSource = new FeatureLayerSearchSource({
      featureLayer: layer,
      searchFields: [displayField],
      displayField: displayField,
      exactMatch: false,
      outFields: ['*'],
      name: name,
      where: where,
      placeholder: placeholder,
      maxResults: 6,
      maxSuggestions: 6,
      suggestionsEnabled: true,
      minSuggestCharacters: 2,
      popupEnabled: false,
      resultGraphicEnabled: false,
      zoomScale: 5000,
    });
    return source;
  }
  ngOnInit() {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    const distance: SimpleChange = changes.distance;
    console.log('prev value: ', distance.previousValue);
    console.log('got name: ', distance.currentValue);
    this._distance = distance.currentValue;
    if (this._selectedProperty) {

      loadModules([
        'esri/geometry/geometryEngine',
        'esri/Graphic',
        'esri/symbols/SimpleFillSymbol'
      ]).then(([geometryEngine, Graphic, SimpleFillSymbol]) => {
          this.bufferProperty(this._mapView, this._property, this._selectedProperty, geometryEngine, Graphic, SimpleFillSymbol);
        });
    }

  }  

}
