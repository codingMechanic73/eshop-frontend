import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SearchService } from 'src/app/service/search.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  searchForm: FormGroup;  

  constructor(private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private formBuilder: FormBuilder) { }

  user = new User();

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.authService.user.subscribe(user => {
      this.user = user;
      if (user == null) {
        this.router.navigate(['home'], { relativeTo: this.activatedRoute })
      }
    })

    this.searchForm = this.formBuilder.group({
      search: [''],
    });
    this.listenToQueryChange();
  }
  
  handleSignOut() {
    this.authService.signOut();
    this.router.navigate([''], { relativeTo: this.activatedRoute })
  }

  listenToQueryChange() {
    this.searchForm.get('search').valueChanges.subscribe(search => {
      console.log(search, "searching....")
      this.searchService.searchQuery.next(search);
    })
  }
}
