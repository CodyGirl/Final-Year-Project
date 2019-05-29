import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  cname = new FormControl('');
  cemail = new FormControl('');
  cnumber = new FormControl('');
  csubject = new FormControl('');

  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      cuname: ['', Validators.required],
      cemail: ['', [Validators.required, Validators.email]],
      cnumber: ['', [Validators.required]],
      csubject: ['', [Validators.required, Validators.minLength(50)]]
  });
  }

  onSubmit() {
    window.emailjs.sendForm('gmail', 'template_LbB5i0J0', '#TechnoPanditContact', 'user_ice9JNf3b8WGlLsHXaxNl')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      });
  }
}
