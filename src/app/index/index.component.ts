import {Component, OnInit} from '@angular/core';
import Variables from 'src/app/Variables';
import {GrService} from '../services/gr.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
  character: Variables[];
  constructor(private grService: GrService) {
    $('.category_nav').css('color', '#fff');
  }
  selected = 'showRows5';
  displayedColumns: string[] = ['id', 'categroyName', 'code', 'status'];

  ngOnInit() {
    this.grService.getRecords().subscribe((data: Variables[]) => {
      this.character = data;
    });
  }
}
