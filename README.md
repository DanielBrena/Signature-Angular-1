# Signature-Angular-1
Directive to make a signature with canvas.

## Usage
1. `bower install signature-angular1 --save`
1. Include `dba-signature-angular.js` from  `bower_components/signature-angular1`
1. Add `dba.signature-angular` as an angular module dependency
1. Use `dba-signature` directive in your template to create the painting canvas.

### dba-signature
```html
 <dba-signature options="{width: 800, height: 400, color: '#000',backgroundColor:'#fff',lineWidth:5,id: 'signature' }"></dba-signature>

```

*Based on*
https://github.com/pwambach/angular-canvas-painter
