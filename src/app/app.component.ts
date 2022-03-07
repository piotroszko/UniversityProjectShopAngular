import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sklepik-front';
  ngOnInit() {
    this.loadScript('../assets/plugins/common/common.min.js');
    this.loadScript('../assets/js/custom.min.js');
    this.loadScript('../assets/js/settings.js');
    this.loadScript('../assets/js/gleek.js');
    this.loadScript('../assets/js/styleSwitcher.js');
  }

 public loadScript(url: string) {
   const body = <HTMLDivElement> document.body;
   const script = document.createElement('script');
   script.innerHTML = '';
   script.src = url;
   script.async = false;
   script.defer = true;
   body.appendChild(script);
 }
}
