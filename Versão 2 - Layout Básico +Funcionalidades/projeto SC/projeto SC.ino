#include <DHT.h>
#include <LiquidCrystal_I2C.h>
#include <virtuabotixRTC.h>

#define DHTTYPE DHT11
DHT dht(5, DHTTYPE);


const int redPin = 9;
const int greenPin = 10;
const int bluePin = 11;
const int photoresistorPin = A0; // photoresistor connected to A0 pin
const int buzzerPin = 13; // active buzzer connected to pin 8

LiquidCrystal_I2C lcd(0x27, 20, 4); // lcd connected with I2C address 0x27, 20 cols and 4 rows

//Determina os pinos ligados ao modulo
//myRTC(clock, data, rst)
virtuabotixRTC myRTC(6, 7, 8);


byte termometru[8] = //icon for termometer
{
    B00100,
    B01010,
    B01010,
    B01110,
    B01110,
    B11111,
    B11111,
    B01110
};

byte droplet[8] = //icon for water droplet
{
    B00100,
    B00100,
    B01010,
    B01010,
    B10001,
    B10001,
    B10001,
    B01110,
};

byte lightBulb[8] = {
    B11111,
    B10101,
    B10101,
    B10001,
    B10001,
    B01110,
    B01010,
    B00100
};



void setup() {
  dht.begin();
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  pinMode(photoresistorPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
  lcd.begin(16,2); // initialize serial communication at 9600 baud
  lcd.init();                      // initialize the   lcd 
  lcd.backlight();
  lcd.setBacklight(HIGH);
  lcd.createChar(1,termometru);
  lcd.createChar(2,droplet);
  lcd.createChar(3, lightBulb);
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int lightLevel = analogRead(photoresistorPin);

  //Le as informacoes do CI
  myRTC.updateTime();
  myRTC.setDS1302Time(5 ,27, 32, 14, 19, 01, 2023);

  lcd.setCursor(0, 0);
  lcd.print(myRTC.hours);
  lcd.print(":");
  lcd.print(myRTC.minutes);
  lcd.print(" ");
  lcd.print(myRTC.dayofmonth);
  lcd.print("-");
  lcd.print(myRTC.month);  
  lcd.print("-");
  lcd.print(myRTC.year);
  lcd.setCursor(0,1);
  lcd.print("                ");
  delay(200);
  lcd.setCursor(4, 1); // move the cursor to the first column and first row
  lcd.write(1);
  lcd.print(temperature);
  lcd.print( (char) 223);
  lcd.print("C");
  delay(2000);
  lcd.setCursor(0,1);
  lcd.print("                ");
  delay(200);
  lcd.setCursor(4, 1);
  lcd.write(2);
  lcd.print(humidity);
  lcd.print("%");
  delay(2000);
  lcd.setCursor(0,1);
  lcd.print("                ");
  delay(200);
  lcd.setCursor(5, 1); // move the cursor to the first column and second row
  lcd.write(3);
  lcd.print(lightLevel);

  // print the values to the serial monitor
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" C");
  Serial.print("Humidity: ");
  Serial.println(humidity);
  Serial.print("Light level: ");
  Serial.println(lightLevel);


  if (temperature < 20) {
    // Cold temperature: blue LED
    analogWrite(redPin, 0);
    analogWrite(greenPin, 0);
    analogWrite(bluePin, lightLevel/4);
    digitalWrite(buzzerPin, LOW);
  }
  else if (temperature >= 20 && temperature < 25) {
    // Cool temperature: green LED
    analogWrite(redPin, 0);
    analogWrite(greenPin, lightLevel/4);
    analogWrite(bluePin, 0);
    digitalWrite(buzzerPin, LOW);
  }
  else {
    // Warm temperature: red LED
    analogWrite(redPin, lightLevel/4);
    analogWrite(greenPin, 0);
    analogWrite(bluePin, 0);
    if (temperature >= 25) {
        //Temperature exceeds 25C, start buzzing
        digitalWrite(buzzerPin, HIGH);
    }
    else {
        digitalWrite(buzzerPin, LOW);
    }
  }
  delay(1000);
    //Imprime as informacoes no serial monitor
  Serial.print("Data : ");
  //Chama a rotina que imprime o dia da semana
  imprime_dia_da_semana(myRTC.dayofweek);
  Serial.print(", ");
  Serial.print(myRTC.dayofmonth);
  Serial.print("/");
  Serial.print(myRTC.month);
  Serial.print("/");
  Serial.print(myRTC.year);
  Serial.print("  ");
  Serial.print("Hora : ");
  //Adiciona um 0 caso o valor da hora seja <10
  if (myRTC.hours < 10)
  {
    Serial.print("0");
  }
  Serial.print(myRTC.hours);
  Serial.print(":");
  //Adiciona um 0 caso o valor dos minutos seja <10
  if (myRTC.minutes < 10)
  {
    Serial.print("0");
  }
  Serial.print(myRTC.minutes);
  Serial.print(":");
  //Adiciona um 0 caso o valor dos segundos seja <10
  if (myRTC.seconds < 10)
  {
    Serial.print("0");
  }
  Serial.println(myRTC.seconds);
  delay( 1000);
  }


void imprime_dia_da_semana(int dia)
{
  switch (dia)
  {
    case 1:
    Serial.print("Domingo");
    break;
    case 2:
    Serial.print("Segunda");
    break;
    case 3:
    Serial.print("Terca");
    break;
    case 4:
    Serial.print("Quarta");
    break;
    case 5:
    Serial.print("Quinta");
    break;
    case 6:
    Serial.print("Sexta");
    break;
    case 7:
    Serial.print("Sabado");
    break;
  }
}
void imprime_dia_da_semana_lcd(int dia)
{
  switch (dia)
  {
    case 1:
    lcd.print("Domingo");
    break;
    case 2:
    lcd.print("Segunda");
    break;
    case 3:
    lcd.print("Terca");
    break;
    case 4:
    lcd.print("Quarta");
    break;
    case 5:
    lcd.print("Quinta");
    break;
    case 6:
    lcd.print("Sexta");
    break;
    case 7:
    lcd.print("Sabado");
    break;
  }
}
