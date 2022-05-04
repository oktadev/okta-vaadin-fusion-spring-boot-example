import {
  LitElement,
  html,
  css,
} from 'lit';

import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import PersonModel from '../../generated/com/example/application/views/people/PersonModel';
import { addPerson, getPeople } from '../../generated/PeopleEndpoint';
import {Binder, field} from "@hilla/form";
import {customElement} from "lit-element";
import Person from "../../generated/com/example/application/views/people/Person";

@customElement('people-view')
export class PeopleView extends LitElement {
  private people: Array<Person | undefined> | undefined = [];
  private message = '';

  // Manages form state, binds inputs to the model
  private binder = new Binder(this, PersonModel);

  render() {
    const { model } = this.binder;

    return html`
     <h1>People</h1>
 
     <div class="message">${this.message}</div>
 
     <ul>
       ${this.people?.map(
      (person) => html`<li>${person?.firstName} ${person?.lastName}</li>`
    )}
     </ul>
 
     <h2>Add new person</h2>
     <div class="form">
       <vaadin-text-field
         label="First Name"
         ...=${field(model.firstName)}
       ></vaadin-text-field>
       <vaadin-text-field
         label="Last Name"
         ...=${field(model.lastName)}
       ></vaadin-text-field>
       <vaadin-button @click=${this.add}>Add</vaadin-button>
     </div>
   `;
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      this.people = await getPeople();
    } catch (e: any) {
      this.message = `Failed to get people: ${e.message}.`;
    }
  }

  async add() {
    try {
      const saved = await this.binder.submitTo(addPerson);
      if (saved) {
        this.people = [...this.people || [], saved];
        this.binder.clear();
      }
    } catch (e: any) {
      this.message = `Failed to save: ${e.message}.`;
    }
  }

  static styles = css`
   :host {
     display: block;
     padding: var(--lumo-space-m) var(--lumo-space-l);
   }
 `;
}
