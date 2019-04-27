import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from '../../http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
    orderList = [];
    nowPage = 1;
    // tslint:disable-next-line:variable-name
    _total = 100;
    listOfDisplayData: any[] = [];
    mapOfCheckedId: { [ key: string ]: boolean } = {};
    isAllDisplayDataChecked = false;
    isIndeterminate = false;
    allChecked = false;
    isVisible = false;
    surveyForm: FormGroup;
    title;
    constructor(private modalService: NzModalService,
                public httpService: HttpService,
                private fb: FormBuilder, ) { }

    ngOnInit() {
        this.surveyForm = this.fb.group({
            name: [null, [Validators.required]],
        });
    }
    refreshStatus(): void {
        this.isAllDisplayDataChecked = this.listOfDisplayData.every(item =>
            this.mapOfCheckedId[item.id]);
        this.isIndeterminate = this.listOfDisplayData.some(item =>
            this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    }
    pageChange(event) {
    }
    currentPageDataChange($event): void {
        this.listOfDisplayData = $event;
        this.refreshStatus();
    }
    checkAll(value: boolean): void {
        this.listOfDisplayData.forEach(item => this.mapOfCheckedId[item.id] = value);
        this.refreshStatus();
    }
    returnSales() {
        this.isVisible = true;
        this.title = '退货信息';
    }
    getSurveyInfo(id) {
        // this.httpService.findAddress(id).subscribe( (r: any) => {
        //     this.pointItem = r.data;
        //     this.surveyForm.get('id').setValue(r.data[0].id);
        //     this.surveyForm.get('name').setValue(r.data[0].name);
        //     this.surveyForm.get('lng').setValue(r.data[0].lng);
        //     this.surveyForm.get('lat').setValue(r.data[0].lat);
        //     this.surveyForm.get('remark').setValue(r.data[0].remark);
        //     this.orderNum = r.data.orderNum;
        // });
    }
    submitForm() {
        // this.postPoints.data = [];
        // // tslint:disable-next-line: forin
        // for (const i in this.surveyForm.controls) {
        //   this.surveyForm.controls[i].markAsDirty();
        //   this.surveyForm.controls[i].updateValueAndValidity();
        // }
        // const data = this.surveyForm.value;
        // if (this.surveyForm.status === 'VALID') {
        //     // this.pointItem[0].dissatisfaction = this.surveyForm.get('dissatisfaction').value;
        //     this.pointItem[0].name = this.surveyForm.get('name').value;
        //     this.pointItem[0].lng = this.surveyForm.get('lng').value;
        //     this.pointItem[0].lat = this.surveyForm.get('lat').value;
        //     this.pointItem[0].remark = this.surveyForm.get('remark').value;
        //     const postData = {
        //         data: this.pointItem,
        //     };
        //     console.log(postData);
        //     this.httpService.updateAddress(postData).subscribe((r: any) => {
        //         this.isVisible = false;
        //         if (r.code === 200) {
        //         this.modalService.success({ nzTitle: '保存成功！' });
        //         // this.getTitleList();
        //         } else {
        //         this.modalService.error({ nzTitle: '保存失败！' });
        //         }
        //     });
        // }
    }
    handleCancel() {
        this.isVisible = false;
        this.surveyForm.reset();
    }
}
