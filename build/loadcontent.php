<?
ini_set('default_socket_timeout', 2);

include 'https://raw.githubusercontent.com/JasonGiedymin/CDN-Rewrites-Redux/master/cdn-rewrites-redux/simple_html_dom.php';
// include './simple_html_dom.php';

$html = file_get_html('./getIO.html');
// $html = @file_get_html('http://147.175.227.220:9915/awp/getIO.html');

if ($html)
  {
    foreach($html->find('div[id]') as $element)
    {
      echo 'obj.'.$element->id.'=';

      // I_CP_AutoMan(S3) ** %I1.2 ** 0-Auto 1-Manual
      if ($element->id =='I1_2'){
        if ($element->innertext==0){
          echo 'obj.I_CP_AutoMan_A="green";'; 
          echo 'obj.I_CP_AutoMan_M="#eee";';
        }
        else {
            echo 'obj.I_CP_AutoMan_A="#eee"; obj.I_CP_AutoMan_M="green";';
        }
      }

      // I_Output_full ** bool
      if ($element->id=='I0_1')
        echo (($element->innertext==0)?'"red"':'"green"').';';
      // I_Tanklevel_low
      if ($element->id=='I0_3')
        echo (($element->innertext==0)?'"red"':'"green"').';';
      // I_Tanklevel_full
      if ($element->id=='I0_4')
        echo (($element->innertext==0)?'"red"':'"green"').';';
      // CNT_Yellow3
      if ($element->id=='MW2')
        echo (!is_nan(floatval ($element->innertext) && floatval ($element->innertext) != 0)?floatval ($element->innertext):'"0"').';';
      // CNT_Yellow2
      if ($element->id=='MW4')
        echo (!is_nan(floatval ($element->innertext) && floatval ($element->innertext) != 0)?floatval ($element->innertext):'"0"').';';
      // CNT_Yellow1
      if ($element->id=='MW6')
        echo (!is_nan(floatval ($element->innertext) && floatval ($element->innertext) != 0)?floatval ($element->innertext):'"0"').';';
      // CNT_All
      if ($element->id=='MW8')
        echo (!is_nan(floatval ($element->innertext) && floatval ($element->innertext) != 0)?floatval ($element->innertext):'"0"').';';
      // AO_MotorSpeed
      if ($element->id=='QW10')
        echo (!is_nan(floatval ($element->innertext) && floatval ($element->innertext) != 0)?floatval ($element->innertext):'"0"').';';
      // HMI_Motor_Speed
      if ($element->id=='MW134')
        echo (!is_nan(floatval ($element->innertext) && floatval ($element->innertext) != 0)?floatval ($element->innertext):'"0"').';';
      // O_MotorAnalog_On
      if ($element->id=='Q0_2')
        echo (($element->innertext==0)?'"#eee"':'"green"').';';
      else
        echo floatval($element->innertext).';';
 
    }
    $html->clear();
  }
  else
  {
    echo 'Error';
  }
  unset($html);

?>

