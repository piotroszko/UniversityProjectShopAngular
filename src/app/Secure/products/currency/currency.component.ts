import { Component, OnInit, Inject, LOCALE_ID, Input   } from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  @Input() value: number;
  constructor(@Inject(LOCALE_ID) private localeId: string) {
    console.log('Locale: ', this.localeId);
  }

  ngOnInit(): void {
  }

}
