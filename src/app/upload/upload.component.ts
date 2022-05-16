import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  fileArr: any[] = [];
  file: any;
  fileName: any
  faVideo=faImage
  progress: number=0;
  message: string | undefined;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private toast:ToastrService,private http: HttpClient) { }

  ngOnInit(): void {
  }

  saveFile(e: any) {
    if (e.target.files[0]) {
      this.file = e.target.files[0];
      console.log(this.file);
      if (this.fileArr.length > 0) {
        this.fileArr = [];
      }
      this.fileArr.push(this.file);
      console.log(this.fileArr);
      this.fileName = e.target.files[0].name;
    }
  }
  getFile(e: any) {
    if (e) {
      let selectedFile = e.item(0)
      console.log(selectedFile);
      if(selectedFile.type=="image/jpeg" || selectedFile.type=="image/png"){
        if (this.fileArr.length > 0) {
          this.fileArr = [];
        }
        this.fileArr.push(selectedFile)
        this.fileName = this.fileArr[0].name;
      }else{
        this.toast.error("Ce champ n'accepte que les video MP4")
      }
    }
  }

  async uploadFile(e: any) {
    let formData = new FormData()
    formData.append("file", this.file);
    formData.append("fileName", this.fileName);
    this.http.post(environment.baseUrl+'/api/uploads', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event:any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.file=undefined;
          this.fileArr=[];
          this.progress=0;
          console.log(this.file);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
}
