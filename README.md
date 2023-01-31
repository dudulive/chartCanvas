# chart-canvas

Lindos gráficos para Angular baseados em Canvas

---

### Instalação

1. Você pode instalar **_chart-canvas_** usando npm

```bash
npm install chart-canvas@next --save
```

or yarn

```bash
yarn add chart-canvas@next --save
```

2. Importe o `ChartModule` no módulo principal do seu aplicativo:

```typescript
import { ChartModule } from "chart-canvas";

  // In your App's module:
  imports: [
    ChartModule
  ]
  ```

### API

## Tipos de gráficos
1. Há uma diretiva para todos os tipos de gráficos: , e há 2 tipos de gráficos: dunot e pie.
   Você pode usar a diretiva em um elemento da seguinte maneira:

```html
<canvas-chart-dunot [data]="data" [colors]="colors"></canvas-chart-dunot>

<canvas-chart-pie [data]="data" [colors]="colors"></canvas-chart-pie>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Chart Canvas';
    colors: string[] = ['#26ffba', '#fde23e', '#f16e23', '#57d9ff', '#937e88', '#ff0000'];
    data: any =  {
      "Classical music": 1,
      "Alternative rock": 2,
      "Pop": 4,
      "Jazz": 1,
      "Hip Hop":2,
      "Country": 0,
  };
}
```
## Propriedades
`data`: Entrada de dados do gráfico onde é passado chave(legendas) e valor;

`colors`: Entrada de cores onde seque e ordem dos dados com a cor;

## Solução de problemas

Siga estas diretrizes ao relatar bugs e solicitações de recursos:

1. Use o [GitHub Issues] (https://github.com/dudulive/chartCanvas/issues) para relatar bugs e solicitações de recursos (
   não é o nosso endereço de e-mail)
2. Escreva ** sempre ** as etapas para reproduzir o erro. Dessa forma, podemos nos concentrar em corrigir o bug, não arranhar nosso
   cabeças tentando reproduzi-lo.

Obrigado pela compreensão!
