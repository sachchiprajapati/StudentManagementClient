import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface User {
  name: string;
  id: number;
}

@Component({
  selector: 'app-materialcontrols',
  templateUrl: './materialcontrols.component.html',
  styleUrls: ['./materialcontrols.component.css']
})
export class MaterialcontrolsComponent implements OnInit {

  myControl = new FormControl<string | User>('');
  options: User[] = [{name: 'Mary', id:1}, {name: 'Shelley', id:2}, {name: 'Igor', id:3}];
  filteredOptions!: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }
}
