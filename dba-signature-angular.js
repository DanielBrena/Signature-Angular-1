(function () {
      'use strict';

      angular
            .module('dba.signature-angular', [])
            .directive('dbaSignature', Signature);

      function Signature() {
            var directive = {
                  link: link,
                  restrict: 'AE',
                  scope: {
                        options: '='
                  },
                  template: '<div class="canvasSignature" style="position:relative"></div>'
            };
            return directive;

            function link(scope, element, attrs) {

                  var options = scope.options;
                  options.canvasId = options.id || 'signature';
                  options.width = options.width || 400;
                  options.height = options.height || 300;
                  options.backgroundColor = options.backgroundColor || '#fff';
                  options.color = options.color || '#000';
                  options.lineWidth = options.lineWidth || 1;
                  var canvas = document.createElement('canvas');
                  canvas.id = options.canvasId;

                  element.find('div').append(canvas);
                  var ctx = canvas.getContext('2d');
                  canvas.width = options.width;
                  canvas.height = options.height;
                  ctx.strokeStyle = "#222222";
                  ctx.lineWidth = options.lineWidth;
                  ctx.lineJoin = 'round';
                  ctx.lineCap = 'round';



                  var drawing = false;
                  var mousePos = {
                        x: 0,
                        y: 0
                  };
                  var lastPos = mousePos;
                  var points = [
                        []
                  ];
                  var count = 0;

                  scope.$on('clean-canvas', function () {
                        clearCanvas();
                  });

                  canvas.addEventListener("mousedown", function (e) {
                        drawing = true;
                        lastPos = getMousePos(canvas, e);

                  }, false);
                  canvas.addEventListener("mouseup", function (e) {
                        drawing = false;
                        points.push([]);
                        count++;

                  }, false);
                  canvas.addEventListener("mousemove", function (e) {
                        if (drawing) {
                              mousePos = getMousePos(canvas, e);
                              points[count].push(mousePos);
                              paint();
                        }
                  }, false);

                  canvas.addEventListener("touchstart", function (e) {
                        mousePos = getTouchPos(canvas, e);
                        var touch = e.touches[0];
                        var mouseEvent = new MouseEvent("mousedown", {
                              clientX: touch.clientX,
                              clientY: touch.clientY
                        });
                        canvas.dispatchEvent(mouseEvent);
                  }, false);
                  canvas.addEventListener("touchend", function (e) {
                        var mouseEvent = new MouseEvent("mouseup", {});
                        canvas.dispatchEvent(mouseEvent);
                  }, false);
                  canvas.addEventListener("touchmove", function (e) {
                        var touch = e.touches[0];
                        var mouseEvent = new MouseEvent("mousemove", {
                              clientX: touch.clientX,
                              clientY: touch.clientY
                        });
                        canvas.dispatchEvent(mouseEvent);
                  }, false);

                  document.body.addEventListener("touchstart", function (e) {
                        if (e.target == canvas) {
                              e.preventDefault();
                        }
                  }, false);
                  document.body.addEventListener("touchend", function (e) {
                        if (e.target == canvas) {
                              e.preventDefault();
                        }
                  }, false);
                  document.body.addEventListener("touchmove", function (e) {
                        if (e.target == canvas) {
                              e.preventDefault();
                        }
                  }, false);

                  function getMousePos(canvasDom, mouseEvent) {
                        var rect = canvasDom.getBoundingClientRect();
                        return {
                              x: mouseEvent.clientX - rect.left,
                              y: mouseEvent.clientY - rect.top
                        };
                  }

                  function getTouchPos(canvasDom, touchEvent) {
                        var rect = canvasDom.getBoundingClientRect();
                        return {
                              x: touchEvent.touches[0].clientX - rect.left,
                              y: touchEvent.touches[0].clientY - rect.top
                        };
                  }

                  function clearCanvas() {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        points = [
                              []
                        ];
                        count = 0;
                  }

                  function paint() {

                        if (points[count].length < 3) {
                              return;
                        }

                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        for (var j = 0; j < points.length; j++) {
                              ctx.beginPath();
                              if (points[j].length > 0) {
                                    for (var i = 1; i < points[j].length - 2; i++) {
                                          var c = (points[j][i].x + points[j][i + 1].x) / 2;
                                          var d = (points[j][i].y + points[j][i + 1].y) / 2;

                                          ctx.quadraticCurveTo(points[j][i].x, points[j][i].y, c, d);
                                    }
                              }
                              ctx.stroke();
                        }

                  }

            }
      }

})();