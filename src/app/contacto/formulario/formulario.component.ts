import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactoService } from 'src/app/services/contacto.service';
import { Contacto } from 'src/app/models/contacto';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  frmContacto: FormGroup = new FormGroup({});

  constructor(
    private contactoService: ContactoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.frmContacto = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)]]
    })

    let id = this.activeRoute.snapshot.paramMap.get('id');

    if (id) {
      let contacto = this.contactoService.get(Number(id));
      if (contacto) {
        this.frmContacto.setValue(contacto)
      }
    }
  }

  onSubmit(): void {
    if (this.frmContacto.valid) {
      let contacto: Contacto = this.frmContacto.value;

      if (contacto.id)
        this.contactoService.update(contacto.id, contacto)
      else {
        contacto.id = Math.max(...this.contactoService.getAll().map(x => x.id), 0) + 1;
        this.contactoService.add(contacto)
      }

      this.router.navigate(['/']);
    }
  }
}
