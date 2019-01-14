import { Component, OnInit, Input } from '@angular/core';
import * as jsPDF from 'jspdf'
@Component({
  selector: 'app-label-maker',
  templateUrl: './label-maker.component.html',
  styleUrls: ['./label-maker.component.css']
})
export class LabelMakerComponent implements OnInit {
  private _labels: any;
  @Input()
  set labels(labels: any[]) {
    this._labels = labels;
  }

  get labels(): any[] {
    return this._labels;
  }  
template:any;
config:any[] = [

  {
    "descriptionPDF": {
      "widthLabelIn": "2-5/8",
      "heightLabelIn": "1",
      "labelsPerPage": "30",
      "averyPartNumber": "*60"
    },
    "labelSpec": {
      "type": "AVERY",
      "pageWidthIn": 8.5,
      "pageHeightIn": 11,
      "pageLeftIn": 0.1875,
      "pageRightIn": 0.1875,
      "pageTopIn": 0.5,
      "pageBottomIn": 0.5,
      "numLabelsAcross": 3,
      "numLabelsDown": 10,
      "labelWidthIn": 2.625,
      "labelHeightIn": 1,
      "horizGapIn": 0.125,
      "vertGapIn": 0,
      "insetIn": 0.1,
      "fontSizePx": 11,
      "maxNumLabelLines": 4
    }
  },
  {
    "descriptionPDF": {
      "widthLabelIn": "4",
      "heightLabelIn": "1",
      "labelsPerPage": "20",
      "averyPartNumber": "*61"
    },
    "labelSpec": {
      "type": "AVERY",
      "pageWidthIn": 8.5,
      "pageHeightIn": 11,
      "pageLeftIn": 0.15625,
      "pageRightIn": 0.15625,
      "pageTopIn": 0.47637821,
      "pageBottomIn": 0.5,
      "numLabelsAcross": 2,
      "numLabelsDown": 10,
      "labelWidthIn": 4,
      "labelHeightIn": 1.0025,
      "horizGapIn": 0.1875,
      "vertGapIn": 0,
      "insetIn": 0.1,
      "fontSizePx": 11,
      "maxNumLabelLines": 4
    }
  },
  {
    "descriptionPDF": {
      "widthLabelIn": "4",
      "heightLabelIn": "1-1/3",
      "labelsPerPage": "14",
      "averyPartNumber": "*62"
    },
    "labelSpec": {
      "type": "AVERY",
      "pageWidthIn": 8.5,
      "pageHeightIn": 11,
      "pageLeftIn": 0.15625,
      "pageRightIn": 0.15625,
      "pageTopIn": 0.81889808,
      "pageBottomIn": 0.83464612,
      "numLabelsAcross": 2,
      "numLabelsDown": 7,
      "labelWidthIn": 4,
      "labelHeightIn": 1.3352,
      "horizGapIn": 0.1875,
      "vertGapIn": 0,
      "insetIn": 0.1,
      "fontSizePx": 11,
      "maxNumLabelLines": 6
    }
  },
  {
    "descriptionPDF": {
      "widthLabelIn": "4",
      "heightLabelIn": "2",
      "labelsPerPage": "10",
      "averyPartNumber": "*63"
    },
    "labelSpec": {
      "type": "AVERY",
      "pageWidthIn": 8.5,
      "pageHeightIn": 11,
      "pageLeftIn": 0.15625,
      "pageRightIn": 0.15625,
      "pageTopIn": 0.5,
      "pageBottomIn": 0.5,
      "numLabelsAcross": 2,
      "numLabelsDown": 5,
      "labelWidthIn": 4,
      "labelHeightIn": 2,
      "horizGapIn": 0.1875,
      "vertGapIn": 0,
      "insetIn": 0.1,
      "fontSizePx": 12,
      "maxNumLabelLines": 10
    }
  },
  {
    "descriptionPDF": {
      "widthLabelIn": "4",
      "heightLabelIn": "3-1/3",
      "labelsPerPage": "6",
      "averyPartNumber": "*64"
    },
    "labelSpec": {
      "type": "AVERY",
      "pageWidthIn": 8.5,
      "pageHeightIn": 11,
      "pageLeftIn": 0.15625,
      "pageRightIn": 0.15625,
      "pageTopIn": 0.4724412,
      "pageBottomIn": 0.50000027,
      "numLabelsAcross": 2,
      "numLabelsDown": 3,
      "labelWidthIn": 4,
      "labelHeightIn": 3.342,
      "horizGapIn": 0.1875,
      "vertGapIn": 0,
      "insetIn": 0.1,
      "fontSizePx": 14,
      "maxNumLabelLines": 12
    }
  },
  {
    "descriptionPDF": {
      "widthLabelIn": "1-3/4",
      "heightLabelIn": "1/2",
      "labelsPerPage": "80",
      "averyPartNumber": "*67"
    },
    "labelSpec": {
      "type": "AVERY",
      "pageWidthIn": 8.5,
      "pageHeightIn": 11,
      "pageLeftIn": 0.307086375,
      "pageRightIn": 0.307086375,
      "pageTopIn": 0.4724412,
      "pageBottomIn": 0.49606326,
      "numLabelsAcross": 4,
      "numLabelsDown": 20,
      "labelWidthIn": 1.75,
      "labelHeightIn": 0.50155,
      "horizGapIn": 0.29527575,
      "vertGapIn": 0,
      "insetIn": 0.1,
      "fontSizePx": 8,
      "maxNumLabelLines": 3
    }
  },
  {
    "descriptionPDF": {
      "widthLabelIn": "1-3/4",
      "heightLabelIn": "2/3",
      "labelsPerPage": "60",
      "averyPartNumber": "*95"
    },
    "labelSpec": {
      "type": "AVERY",
      "pageWidthIn": 8.5,
      "pageHeightIn": 11,
      "pageLeftIn": 0.28936983,
      "pageRightIn": 0.28936983,
      "pageTopIn": 0.53937037,
      "pageBottomIn": 0.5511814,
      "numLabelsAcross": 4,
      "numLabelsDown": 15,
      "labelWidthIn": 1.75,
      "labelHeightIn": 0.6605,
      "horizGapIn": 0.30708678,
      "vertGapIn": 0,
      "insetIn": 0.1,
      "fontSizePx": 8,
      "maxNumLabelLines": 4
    }
  }
]    
  constructor() { }
  print() {
    const doc = new jsPDF({
      orientation: 'portait',
      unit: 'in',
      format:  'letter'
    });
  let spec:any = this.template.labelSpec;
  let per:number = spec.numLabelsAcross * spec.numLabelsDown;
  let pages:number = Math.ceil(this._labels.length/per);
  
    console.log(pages);
   doc.setLineWidth(0.01);
   doc.setFontSize(spec.fontSizePx);
   for (let p = 0; p < pages;p++) {
    console.log(p*per);
    console.log((p*per)+per);
    let pageLabels:any[] = this._labels.slice(p*per,(p*per)+per);
    console.log(pageLabels);
     for (let y = 0; y < spec.numLabelsDown;y++) {
      let rowLabels:any[] = pageLabels.slice(y*spec.numLabelsAcross, (y*spec.numLabelsAcross)+spec.numLabelsAcross);

      for (let x = 0; x < spec.numLabelsAcross;x++) {
        if (rowLabels[x]) {

          let label:any = rowLabels[x];
          let ownerW:number = doc.getTextWidth(label.OWNER);
          let addr1W:number = doc.getTextWidth(label.ADDR1);
          let addr2W:number = doc.getTextWidth(label.ADDR2);

          if (ownerW > spec.labelWidthIn) {
          //  label.OWNER =label.OWNER.substr(0,25) + '...';
          }
          if (addr1W > spec.labelWidthIn) {
            console.log(label.ADDR1);
          }
          if (addr1W > spec.labelWidthIn) {
            console.log(label.ADDR2);
          }          
          let owner = "";
          let ownerSplit = doc.splitTextToSize(label.OWNER, spec.labelWidthIn);
          ownerSplit.forEach((split, i) => {
            if(split.length > 0) {
              owner += split;
            }
            if (i < ownerSplit.length - 1) {
              owner += '\n';
            }
          });

          let value:string = owner + '\n'+ label.ADDR1 + '\n'+ label.ADDR2 + '\n';
          if (label.ADDR3) {
            value += label.ADDR3;
          }
          doc.text(value, 
            (spec.pageLeftIn * x) + spec.horizGapIn + (spec.labelWidthIn * x), 
            (spec.pageTopIn) + spec.vertGapIn + (spec.labelHeightIn * y),
            {baseline: 'top'}
          );
  
 
  
          doc.rect((spec.pageLeftIn * x) + spec.horizGapIn + (spec.labelWidthIn * x),
          (spec.pageTopIn) + spec.vertGapIn + (spec.labelHeightIn * y), 
          spec.labelWidthIn, 
          spec.labelHeightIn)
        }
       }
     }
     doc.addPage();
     doc.setLineWidth(0.01);


   }



doc.save('mailing_labels.pdf') 
  }
  ngOnInit() {
    this.template = this.config[6];

  }

}
