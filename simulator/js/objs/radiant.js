// Point source -> 360 degrees
objTypes['radiant'] = {

  //建立物件 Create the obj
  create: function(mouse) {
  return {type: 'radiant', x: mouse.x, y: mouse.y, p: 0.5};
  },

  p_box: objTypes['laser'].p_box,

  //建立物件過程滑鼠按下 Mousedown when the obj is being constructed by the user
  c_mousedown: function(obj, mouse, ctrl, shift)
  {
    draw();
  },
  //建立物件過程滑鼠移動 Mousemove when the obj is being constructed by the user
  c_mousemove: function(obj, mouse, ctrl, shift)
  {

  },
  //建立物件過程滑鼠放開 Mouseup when the obj is being constructed by the user
  c_mouseup: function(obj, mouse, ctrl, shift)
  {
    isConstructing = false;
  },

  //將物件畫到Canvas上 Draw the obj on canvas
  draw: function(obj, canvas) {
  if (colorMode) {
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = wavelengthToColor(obj.wavelength || 532, 1);
    ctx.fillRect(obj.x - 2.5, obj.y - 2.5, 5, 5);
    ctx.fillStyle = getMouseStyle(obj, 'rgb(255,255,255)', true);
    ctx.fillRect(obj.x - 1.5, obj.y - 1.5, 3, 3);
    ctx.globalCompositeOperation = "source-over";
  } else {
    ctx.fillStyle = getMouseStyle(obj, 'rgb(0,255,0)');
    ctx.fillRect(obj.x - 2.5, obj.y - 2.5, 5, 5);
  }

  },

  //平移物件 Move the object
  move: function(obj, diffX, diffY) {
    obj.x = obj.x + diffX;
    obj.y = obj.y + diffY;
    return obj;
  },

  //繪圖區被按下時(判斷物件被按下的部分) When the drawing area is clicked (test which part of the obj is clicked)
  clicked: function(obj, mouse_nogrid, mouse, draggingPart) {
    if (mouseOnPoint(mouse_nogrid, obj))
    {
      draggingPart.part = 0;
      draggingPart.mouse0 = graphs.point(obj.x, obj.y);
      draggingPart.targetPoint = graphs.point(obj.x, obj.y);
      draggingPart.snapData = {};
      return true;
    }
    return false;
  },

  //拖曳物件時 When the user is dragging the obj
  dragging: function(obj, mouse, draggingPart, ctrl, shift) {
    if (shift)
    {
      var mouse_snapped = snapToDirection(mouse, draggingPart.mouse0, [{x: 1, y: 0},{x: 0, y: 1}], draggingPart.snapData);
    }
    else
    {
      var mouse_snapped = mouse;
      draggingPart.snapData = {}; //放開shift時解除原先之拖曳方向鎖定 Unlock the dragging direction when the user release the shift key
    }

    obj.x = mouse_snapped.x;
    obj.y = mouse_snapped.y;
  },

  //射出光線 Shoot rays
  shoot: function(obj) {
  var s = Math.PI * 2 / parseInt(getRayDensity() * 500);
  var i0 = (mode == 'observer') ? (-s * 2 + 1e-6) : 0; //為避免使用觀察者時出現黑色間格 To avoid black gap when using the observer
  for (var i = i0; i < (Math.PI * 2 - 1e-5); i = i + s)
  {
    var ray1 = graphs.ray(graphs.point(obj.x, obj.y), graphs.point(obj.x + Math.sin(i), obj.y + Math.cos(i)));
    ray1.brightness_s = Math.min(obj.p / getRayDensity(), 1) * 0.5;
    ray1.brightness_p = Math.min(obj.p / getRayDensity(), 1) * 0.5;
    ray1.isNew = true;
    if (colorMode) {
      ray1.wavelength = obj.wavelength || 532;
    }
    if (i == i0)
    {
      ray1.gap = true;
    }
    addRay(ray1);
  }
  }

};
