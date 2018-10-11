#include "ESP8266.h"
#include <SoftwareSerial.h>

const char* SSID = "NOMBRE DE LA RED";
const char* PASSWORD = "PASSWORD DE LA RED";
const int HOST_PORT = 80;
const char* SERVER = "https://app-temperatura.herokuapp.com";
const char* URI = "/temperatura";



SoftwareSerial softSerial(2, 3); // RX, TX
ESP9266 wifi(softSerial);

void setup() {
  Serial.begin(9600);

  if(wifi.setOprToStationSoftAp()){
    Serial.print("to station + softap ok\r\n");
  }else{
    Serial.print("to station + softap err\r\n");
  }

  if(wifi.joinAP(SSID, PASSWORD)){
    Serial.print("Conexion a la red exitosa\r\n");
    Serial.print("IP:");
    Serial.println(wifi.getLocalIP().c_str());
  }else{
    Serial.print("Fallo al realizar la conexion a la red\r\n");
  }

  if(wifi.disableMUX()){
    Serial.print("Single ok\r\n");
  }else{
    Serial.print("Single err\r\n");
  }
  Serial.print("Fin de la configuracion");
}

void loop() {
  httpPost(obtenerTemperatura());
  delay(600000);
}

//============ LEER DATOS DEL SENSOR(LM35) ============
float obtenerTemperatura(){
  float lecturaSensor = analogRead(0);
  return (5.0 * lecturaSensor * 100.0)/1024.0;
}

//============ ENVIAR LOS DATOS AL SERVIDOR ============  
void httpPOST(float temperatura) {
  wifi.println("AT+CIPSTART=\"TCP\",\""+SERVER+"\","+HOST_PORT);//COMENZAR UNA CONEXION TCP
  if(wifi.find("OK")){
    Serial.println("Conexion TCP listo");
  }
  const char* json = "{temperatura: "+temperatura+"}";
  delay(1000);
  String POST = "POST"+URI+" HTTP/1.0\r\n"+
                "HOST: "+SERVER+"\r\n"+
                "Accept: *"+"/"+"*\r\n"+
                "Content-Type: application/json\r\n"+
                "\r\n"+json;
   String sendCmd = "AT+CIPSEND=";//DETERMINA EL NUMERO DE CARACTERES A ENVIAR
   wifi.print(sendCmd);
   wifi.println(POST.length());
   delay(500);
   if(wifi.find(">")){
    Serial.println("Enviando...") ;
    wifi.print(POST);
    
    if(wifi.find("SEND OK")){
      Serial.println("Datos enviados");
      while(wifi.avaible()){
        String respuesta = wifi.readString();
        Serial.println(respuesta) ;
      }

      wifi.println("AT+CIPCLOSE");//CERRAMOS LA CONEXION
    }

   }  
}
