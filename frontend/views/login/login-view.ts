import { customElement, html, LitElement } from 'lit-element';
import { signIn } from '../../auth';
import '@vaadin/vaadin-login/vaadin-login-form';

@customElement('login-view')
export class LoginView extends LitElement {
  private error = !!new URLSearchParams().get('error');

  render() {
    return html`
     <style>
       login-view {
         display: flex;
         flex-direction: column;
         height: 100%;
         align-items: center;
         justify-content: center;
       }
     </style>
     <vaadin-login-form 
       @login=${this.login} 
       ?error=${this.error}
       no-forgot-password
     ></vaadin-login-form>
   `;
  }

  async login(e: CustomEvent) {
    try {
      await signIn(e.detail.username, e.detail.password);
    } catch (e) {
      this.error = true;
    }
  }

  // Render in light DOM for password managers
  protected createRenderRoot() {
    return this;
  }
}
