#include <SPI.h>
#include <Ethernet.h>

//DIRECCION MAC
byte mac[] = {
  0x84, 0xA6, 0xC8, 0x8D, 0x25, 0x6C
};

//INICIZLIZAR UN CLIENTE WEB
EthernetClient client;

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  Serial.println("Empieza la configuracion del modulo");
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Error al obtener una direccion ip por medio de DHCP");
    for (;;)
      ;
  }
  Serial.print("Mi direccion IP es: ");
  for (byte thisByte = 0; thisByte < 4; thisByte++) {
    Serial.print(Ethernet.localIP()[thisByte], DEC);
    Serial.print(".");
  }
  Serial.println();
  delay(1000);
}

void loop() {
  httpPOST(obtenerTemperatura());
  delay(600000);
}

//============ LEER DATOS DEL SENSOR(LM35) ============
float obtenerTemperatura(){
  //float lecturaSensor = analogRead(0);
  float lecturaSensor = random(1024);
  return (5.0 * lecturaSensor * 100.0)/1024.0;
}

//============ ENVIAR LOS DATOS AL SERVIDOR ============
void httpPOST(float temperatura){
  String json = "{\"temperatura\":";
  json += temperatura;
  json += "}";
  Serial.println("Empezamos la conexion");
  if(client.connect("192.168.1.109", 3000)){
    client.println("POST / HTTP/1.1");
    client.println("Host: 192.168.1.109");
    client.println("Content-Type: application/json");
    client.print("Content-Length: ");
    client.println(json.length());
    client.println();
    client.println(json);
    Serial.println("Peticion enviada");
  }
  if(client.connected()){
    client.stop();
  }
}
