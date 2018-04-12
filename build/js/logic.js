// Main logic 
$('document').ready(function(){

  var obj = {};
  var oldObj = {};  

  /** conveyorSpeedEntity
    * 
    * When conveyor speed is changed function: 
    * 1. evaluates new height and offset of inner plane based on convSpeed value
    * 2. change attributes
    *       
    */
  var conveyorSpeedEntity = function (convSpeed)
  {
    // motor_speed: max: 100 (27648) min: 0

    convSpeed = convSpeed / 100;

    if (oldObj.MW134 != 0) 
    {
      var outerHeight = 3.4;

      var innerHeight = outerHeight * convSpeed;
      var innerOffset = (outerHeight/2) * (1 - convSpeed);

      var objInnerPosition = new THREE.Vector3( 0, -innerOffset, 0.02 );

      // Set inner plane posittion with offset
      document.querySelector("#motor_speed_inner").setAttribute('position', objInnerPosition);
      // Set inner plane height
      document.querySelector("#motor_speed_inner").setAttribute('geometry', 'height', innerHeight);
    }
    else 
      return;
  }

  /** changeAnimationSpeed
    * 
    * When conveyor speed is changed function: 
    * 1. get current clip duraiton
    * 2. change duration attribute via components 
    *       
    */
  var changeAnimationSpeed = function (convSpeed, entity, btnConveyorColor)
  {
    // get clip duration
    var clipDuration = document.querySelector('#' + entity).components.animation_handler.getDuration;

    // optional fuction parameter
    btnConveyorColor = btnConveyorColor || "#eee";

    // update component pause attribute
    // check if conveyior is ON!
    if (btnConveyorColor == "green") 
    {
      document.querySelector('#' + entity).setAttribute('animation_handler', 'pause', 'false');
    }

    else if (btnConveyorColor == "#eee")
    {
      document.querySelector('#' + entity).setAttribute('animation_handler', 'pause', 'true');
    }

    // Set halt property to entity, when conveyor spreed is 0
    if (convSpeed == 0)
    {
      document.querySelector('#' + entity).setAttribute('animation_handler', 'halt: 2');
    }
    else if (convSpeed != 0)
    {
      if (clipDuration > 0)
      {
        // !! change clipDuration * convSpeed on /
        document.querySelector('#' + entity).setAttribute('animation_handler', 'halt: 0');
        document.querySelector('#' + entity).setAttribute('animation_handler', 'duration', clipDuration / (convSpeed / 100));
      }
    }
  }

  $( document ).ready(function() {
    setInterval(function () {
      $.get('./loadcontent.php', {}, function(res)
      {    
        // alert(res);
        if (res!="Error")
        {
          eval(res);

          if(Object.keys(oldObj).length != 0) 
          {            
            document.querySelector("#I_CP_AutoMan_A").setAttribute('material', 'color', obj.I_CP_AutoMan_A);
            document.querySelector("#I_CP_AutoMan_M").setAttribute('material', 'color', obj.I_CP_AutoMan_M);
            document.querySelector("#I_Output_full").setAttribute('material', 'color', obj.I0_1);
            document.querySelector("#I_Tanklevel_full").setAttribute('material', 'color', obj.I0_4);
            document.querySelector("#I_Tanklevel_low").setAttribute('material', 'color', obj.I0_3);
            document.querySelector("#CNT_All > a-text").setAttribute('value', obj.MW8);
            document.querySelector("#CNT_Yellow1 > a-text").setAttribute('value', obj.MW6);
            document.querySelector("#CNT_Yellow2 > a-text").setAttribute('value', obj.MW4);
            document.querySelector("#CNT_Yellow3 > a-text").setAttribute('value', obj.MW2);
            document.querySelector("#AO_MotorSpeed > a-text").setAttribute('value', (obj.MW134 + '%'));
            document.querySelector("#O_MotorAnalog_On").setAttribute('material', 'color', obj.Q0_2);

            // Toglle output tank visibility, based on obj.I0_1 value
            if ( obj.I0_1 && obj.I0_1 == 'green' ) 
              document.querySelector("#_I_Output_full_model").setAttribute('visible', true);
            else                   
              document.querySelector("#_I_Output_full_model").setAttribute('visible', false);

            // Toggle input tank level models, based on obj.I0_4, obj.I0_3
            if ( obj.I0_4 == 'green' && obj.I0_3 == 'green')
            {
              document.querySelector("#_tanklevel_full").setAttribute('visible', true);                  
              document.querySelector("#_tanklevel_low").setAttribute('visible', false);                  
            }
            else if ( obj.I0_4 == 'red' && obj.I0_3 == 'green' )
            {
              document.querySelector("#_tanklevel_full").setAttribute('visible', false);                  
              document.querySelector("#_tanklevel_low").setAttribute('visible', true);                                    
            }
            else
            {
              document.querySelector("#_tanklevel_full").setAttribute('visible', false);                  
              document.querySelector("#_tanklevel_low").setAttribute('visible', false);                                                     
            }

            // Set conveyor component speed level based on conveyor speed
            conveyorSpeedEntity(obj.MW134);

            // Set animation speed for corn animaiton based on conveyor speed
            changeAnimationSpeed(obj.MW134, '_corn_animation1_loop', obj.Q0_2);
          }
          oldObj = Object.assign({}, obj);
        }
        // console.log(obj);
      });   
    }, 15000); // refresh
  });
});