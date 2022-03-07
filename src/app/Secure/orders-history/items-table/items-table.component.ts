import { Component, Input, OnInit } from '@angular/core';
import { OrderPostion } from '../orderPostion';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.css']
})
export class ItemsTableComponent implements OnInit {
  @Input() order_id: number;
  @Input() postionsTable: OrderPostion[];
  filteredPostions: OrderPostion[];
  public filterList(): void
  {
    this.filteredPostions = this.postionsTable.filter(x => x.order_id == this.order_id);
  }
  isNotEmpty(){
    if(this.filteredPostions.length == 0)
      return true;
    else return false;
  }

  constructor() { }

  ngOnInit(): void {
    this.filterList();
  }

}
