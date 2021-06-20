import {
  Component,
  ContentChild,
  ContentChildren,
  OnInit,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @ContentChildren(TabComponent) content!: QueryList<TabComponent>;
  isActive: boolean;

  constructor() {}

  ngOnInit(): void {}

  setActive(tab: TabComponent) {
    tab.isActive = true;
    this.content.forEach((tabx) => {
      if (tabx === tab) {
        return;
      } else {
        tabx.isActive = false;
      }
    });
  }
}
