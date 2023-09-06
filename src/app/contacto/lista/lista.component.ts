import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto } from 'src/app/models/contacto';
import { ContactoService } from 'src/app/services/contacto.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'telefono', 'acciones'];

  constructor(private contactoService: ContactoService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  obtenerContactos(): Contacto[] {
    return this.contactoService.getAll()
  }

  eliminarContacto(contacto: Contacto): void {
    this.contactoService.remove(contacto.id)
  }

  editarContacto(contacto: Contacto): void {
    this.router.navigate(['/contacto', contacto.id]);
  }
}
