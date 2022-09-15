// Blocker
objTypes['blackline'] = {

  //建立物件 Create the obj
  create: function(mouse) {
    return {type: 'blackline', p1: mouse, p2: mouse};
  },

  //使用lineobj原型 Use the prototype lineobj
  c_mousedown: objTypes['lineobj'].c_mousedown,
  c_mousemove: objTypes['lineobj'].c_mousemove,
  c_mouseup: objTypes['lineobj'].c_mouseup,
  move: objTypes['lineobj'].move,
  clicked: objTypes['lineobj'].clicked,
  dragging: objTypes['lineobj'].dragging,
  rayIntersection: objTypes['lineobj'].rayIntersection,

  //將物件畫到Canvas上 Draw the obj on canvas
  draw: function(obj, canvas) {
  //var ctx = canvas.getContext('2d');
  ctx.strokeStyle = getMouseStyle(obj, 'rgb(70,35,10)');
  ctx.lineWidth = 3;
  ctx.lineCap = 'butt';
  ctx.beginPath();
  ctx.moveTo(obj.p1.x, obj.p1.y);
  ctx.lineTo(obj.p2.x, obj.p2.y);
  ctx.stroke();
  ctx.lineWidth = 1;
  },

  //當物件被光射到時 When the obj is shot by a ray
  shot: function(obj, ray, rayIndex, rp) {
    ray.exist = false;
  }

};
