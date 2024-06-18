import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Training } from '../../training.model';
@Component({
  selector: 'app-training-item',
  templateUrl: './training-item.component.html',
  styleUrls: ['./training-item.component.css']
})
export class TrainingItemComponent implements OnInit {
  @Input() training: Training;
  @Input() index: number;
  
  ngOnInit() {
      
  }

}
