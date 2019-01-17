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
      "insetInX": 0.1,
      "insetInY": 0.1,
      "fontSizePx": 8,
      "maxNumLabelLines": 4
    }
  },
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
      "insetInX": 0.1,
      "insetInY": 0.2,
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
      "insetInX": 0.1,
      "insetInY": 0.2,
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
      "insetInX": 0.1,
      "insetInY": 0.4,
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
      "insetInX": 0.1,
      "insetInY": 0.6,
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
      "insetInX": 0.1,
      "insetInY": 1.2,
      "fontSizePx": 14,
      "maxNumLabelLines": 12
    }
  },
  // {
  //   "descriptionPDF": {
  //     "widthLabelIn": "1-3/4",
  //     "heightLabelIn": "1/2",
  //     "labelsPerPage": "80",
  //     "averyPartNumber": "*67"
  //   },
  //   "labelSpec": {
  //     "type": "AVERY",
  //     "pageWidthIn": 8.5,
  //     "pageHeightIn": 11,
  //     "pageLeftIn": 0.307086375,
  //     "pageRightIn": 0.307086375,
  //     "pageTopIn": 0.4724412,
  //     "pageBottomIn": 0.49606326,
  //     "numLabelsAcross": 4,
  //     "numLabelsDown": 20,
  //     "labelWidthIn": 1.75,
  //     "labelHeightIn": 0.50155,
  //     "horizGapIn": 0.29527575,
  //     "vertGapIn": 0,
  //     "insetInX": 0.1,
  //     "insetInY": 0.1,
  //     "fontSizePx": 7,
  //     "maxNumLabelLines": 3
  //   }
  // },

]    

  constructor() { }
  export() {
    
    const doc = new jsPDF({
      orientation: 'portait',
      unit: 'in',
      format:  'letter'
    });
  let spec:any = this.template.labelSpec;
  let per:number = spec.numLabelsAcross * spec.numLabelsDown;
  let pages:number = Math.ceil(this._labels.length/per);
    doc.setLineWidth(0.01);
   doc.setFontSize(spec.fontSizePx);
   for (let p = 0; p < pages;p++) {
    let pageLabels:any[] = this._labels.slice(p*per,(p*per)+per);
     for (let y = 0; y < spec.numLabelsDown;y++) {
      let rowLabels:any[] = pageLabels.slice(y*spec.numLabelsAcross, (y*spec.numLabelsAcross)+spec.numLabelsAcross);

      for (let x = 0; x < spec.numLabelsAcross;x++) {
        if (rowLabels[x]) {
          let label:any = rowLabels[x];
          let owner = "";
          let ownerSplit = [];
          if (label.OWNER) {
            ownerSplit = doc.splitTextToSize(label.OWNER, spec.labelWidthIn - (spec.insetInX * 2)).slice(0,2);
            if (ownerSplit[ownerSplit.length - 1].trim().length === 0) {
              ownerSplit.pop();
            }
          }
          let addr1 = "";
          let addr1Split = [];
          if (label.ADDR1) {
            
            addr1Split = doc.splitTextToSize(label.ADDR1, spec.labelWidthIn - (spec.insetInX * 2)).slice(0,2); 
            if (addr1Split[addr1Split.length - 1].trim().length === 0) {
              addr1Split.pop();
            }
          }
          let addr2 = "";    
          let addr2Split = [];
          if (label.ADDR2) {
            addr2Split = doc.splitTextToSize(label.ADDR2, spec.labelWidthIn - (spec.insetInX * 2)).slice(0,2);  
            if (addr2Split[addr2Split.length - 1].trim().length === 0) {
              addr2Split.pop();
            }            
          }
          let addr3 = "";    
          let addr3Split = [];
          if (label.ADDR3) {

            addr3Split = doc.splitTextToSize(label.ADDR3, spec.labelWidthIn - (spec.insetInX * 2)).slice(0,2);
            if (addr3Split[addr3Split.length - 1].trim().length === 0) {
              addr3Split.pop();
            }         
          }           

          let lines:number = ownerSplit.length + addr1Split.length + addr2Split.length + addr3Split.length;



           
                   

          if (ownerSplit.length === 1) {
            owner = ownerSplit[0];
          } else if (ownerSplit.length === 2) {
            if (label.OWNER.length < 26) {
              owner = ownerSplit[0] + ' ' + ownerSplit[1];
              lines -= 1


            } else {
              owner = ownerSplit[0] + '\n' + ownerSplit[1];
            }
          }
          if (addr1Split.length === 1) {
            addr1 = addr1Split[0];
          } else if (addr1Split.length === 2) {
            if (label.ADDR1.length < 26) {
              addr1 = addr1Split[0] + ' ' + addr1Split[1];
              lines -= 1

            } else {

              addr1 = addr1Split[0] + '\n' + addr1Split[1];
            }          
          }
          if (addr2Split.length === 1) {
            addr2 = addr2Split[0];
          } else if (addr2Split.length === 2) {
            if (label.ADDR2.length < 26) {
              addr2 = addr2Split[0] + ' ' + addr2Split[1];
              lines -= 1

            } else {

              addr2 = addr2Split[0] + '\n' + addr2Split[1];
            }
          }
          if (addr3Split.length === 1) {
            addr3 = addr3Split[0];
          } else if (addr3Split.length === 2) {
            if (label.ADDR3.length < 26) {
              addr3 = addr3Split[0] + ' ' + addr3Split[1];
              lines -= 1
            } else {
              addr3 = addr3Split[0] + '\n' + addr3Split[1];

            }
          }
          
          let value:string = '';
          value = owner + '\n'+ addr1 + '\n'+ addr2 + '\n' + addr3;

          if (lines > spec.maxNumLabelLines + 1 && ownerSplit.length > 1) {
            value = ownerSplit[0] + '\n'+ addr1 + '\n'+ addr2 + '\n' + addr3;
            owner = ownerSplit[0];
            lines -= 1;
          } 
          if (lines > spec.maxNumLabelLines + 1 && addr1Split.length > 1 && typeof addr1Split[0].substr(0,1) != 'number') {
            value = owner + '\n'+ addr1Split[0] + '\n'+ addr2 + '\n' + addr3;
            lines -= 1;
          }           
          // if (lines <= spec.maxNumLabelLines + 1){
          //   value = owner + '\n'+ addr1 + '\n'+ addr2 + '\n' + addr3;
          // } else {
            

          //   if (ownerSplit.length > 1) {
          //     value = ownerSplit[0] + '\n'+ addr1 + '\n'+ addr2 + '\n' + addr3;
          //     lines -= 1;

          //   } 

          // }

      //    lines = value.split('\n').length;

          let lhf:number = 1.15;
          if (lines > spec.maxNumLabelLines ) {
            lhf = 1;
          }
         // if (lines > spec.maxNumLabelLines  ) {
           // doc.setFontSize(spec.fontSizePx - .5);

      //    }
          doc.text(value, 
            (spec.pageLeftIn * x) + spec.horizGapIn + (spec.labelWidthIn * x) + spec.insetInX, 
            (spec.pageTopIn) + spec.vertGapIn + (spec.labelHeightIn * y)+ spec.insetInY, 
            {baseline: 'middle', lineHeightFactor: lhf}
          );
          
          doc.setFontSize(spec.fontSizePx);
  

  
 
          doc.setDrawColor(240,240,240);
          doc.rect((spec.pageLeftIn * x) + spec.horizGapIn + (spec.labelWidthIn * x),
          (spec.pageTopIn) + spec.vertGapIn + (spec.labelHeightIn * y), 
          spec.labelWidthIn, 
          spec.labelHeightIn);
          doc.setDrawColor('black');

        }
       }
     }
     if (p < pages - 1) {
      doc.addPage();

     }
     doc.setLineWidth(0.0001);


   }



doc.save('mailing_labels.pdf') 
  }
  ngOnInit() {
    this.template = this.config[0];

  }

}
