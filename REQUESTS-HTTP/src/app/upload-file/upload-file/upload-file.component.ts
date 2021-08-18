import { UploadFileService } from './../upload-file.service';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>
  progress = 0;

  constructor(
    private service: UploadFileService,
  ) { }

  ngOnInit(): void {

  }
  onChange(event) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i])
    }
    document.getElementById('inputFileLabel').innerHTML = fileNames.join(', ');

    this.progress = 0;
  }

  onUpload(){
    if(this.files && this.files.size > 0 ){
      this.service.upload(this.files, environment.BASE_URL +'/upload')
      .pipe(
        uploadProgress(progress => {
          console.log(progress)
          this.progress = progress
        }),
        filterResponse()
      )
      .subscribe(reponse => console.log('upload completo'))
      /*.subscribe((event: HttpEvent<Object>) => {
        //HttpEventType
        console.log(event);
        if(event.type == HttpEventType.Response){
          console.log('upload completo')
        }
        else if(event.type == HttpEventType.UploadProgress){
          const porcentagem = Math.round((event.loaded * 100) / event.total);
          console.log('progresso:', porcentagem)
          this.progress = porcentagem;
        }
      });*/
    }
  }

  onDownloadArquivo(){
    this.service.download(environment.BASE_URL +'downloadArquivo')
    .subscribe((res:any) => {
      this.service.handleFile(res, 'report.png')
    })

  }
  onDownloadPDF(){
    this.service.download(environment.BASE_URL +'downloadPDF')
    .subscribe((res:any) => {
      this.service.handleFile(res, 'report.pdf')
    })
  }
}
