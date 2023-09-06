import { Injectable } from '@angular/core';
import { Contacto } from '../models/contacto';

const name: string = 'lista-contactos'

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private _contactos: Contacto[];

  constructor() {
    this._contactos = JSON.parse(localStorage.getItem(name)!) || [];
  }

  private updateStorage() {
    localStorage.setItem(name, JSON.stringify(this._contactos))
  }

  getAll() {
    return [...this._contactos]
  }

  get(id: number): Contacto {
    return this._contactos.find(c => c.id == id)!;
  }

  add(contacto: Contacto) {
    this._contactos.push(contacto)
    this.updateStorage()
  }

  update(id: number, change: Contacto) {
    let contacto = this._contactos.find(x => x.id === id)
    if (contacto) {
      Object.assign(contacto, change);
      this.updateStorage();
    }
  }

  remove(id: number) {
    this._contactos.forEach((value, index) => {
      if (value.id == id) this._contactos.splice(index, 1);
    });
    this.updateStorage();
  }
}
