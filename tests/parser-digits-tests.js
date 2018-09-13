import {ParserTest} from './parser-tests.js';


class ParserDigitsTest extends ParserTest {


  constructor(pattern) {
    super();
    this.settings['digits'] = pattern;
  }

}

let patternUS = /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/;
let patternEuropean = /^(?:[0-9]+(?:\{\.\}[0-9]{3})*(?:,[0-9]*)?|,[0-9]+)/;

let parserTest = new ParserDigitsTest(patternUS);

parserTest.runTest(
  'Integer', '2',
  {"kind":"math",
   "texClass":0,
   "attributes":{"display":"block"},
   "inherited":{"displaystyle":true,
                "scriptlevel":0},
   "properties":{},
   "childNodes":[
     {"kind":"mrow",
      "texClass":0,
      "attributes":{},
      "inherited":{
        "displaystyle":true,
        "scriptlevel":0},
      "properties":{},
      "childNodes":[
        {"kind":"mn",
         "texClass":0,
         "attributes":{},
         "inherited":{
           "displaystyle":true,
           "scriptlevel":0},
         "properties":{},
         "childNodes":[
           {"kind":"text",
            "text":"2"}]}],
      "isInferred":true}]}
);


parserTest.runTest(
  'Number', '3.14',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {
        "displaystyle": true,
        "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "mn",
         "texClass": 0,
         "attributes": {},
         "inherited": {
           "displaystyle": true,
           "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "text",
            "text": "3.14"}]}],
      "isInferred": true}]}
);

parserTest.runTest(
  'Thousands', '1{,}000.10',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {
        "displaystyle": true,
        "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "mn",
         "texClass": 0,
         "attributes": {},
         "inherited": {
           "displaystyle": true,
           "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "text",
            "text": "1,000.10"}]}],
      "isInferred": true}]}
);

parserTest.runTest(
  'Wrong Thousands', '1{,}0000.10',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "mn",
         "texClass": 0,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "text",
            "text": "1,000"}]},
        {"kind": "mn",
          "texClass": 0,
          "attributes": {},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": "0.10"}]}],
      "isInferred": true}]}
);

parserTest.runTest(
  'Decimal', '.',
  {"kind": "math",
   "texClass": 6,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 6,
      "attributes": {},
      "inherited": {
        "displaystyle": true,
        "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "mo",
         "texClass": 6,
         "attributes": {},
         "inherited": {
           "displaystyle": true,
           "scriptlevel": 0,
           "form": "infix",
           "separator": true},
         "properties": {},
         "childNodes": [
           {"kind": "text",
            "text": "."}],
         "isEmbellished": true}],
      "isInferred": true,
      "isEmbellished": true}],
   "isEmbellished": true}
);


parserTest.runTest(
  'Integer Font', '\\mathbf{2}',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {
        "displaystyle": true,
        "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "TeXAtom",
         "texClass": 0,
         "attributes": {},
         "inherited": {
           "displaystyle": true,
           "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "mrow",
            "texClass": 0,
            "attributes": {},
            "inherited": {
              "displaystyle": true,
              "scriptlevel": 0},
            "properties": {},
            "childNodes": [
              {"kind": "mn",
               "texClass": 0,
               "attributes": {"mathvariant": "bold"},
               "inherited": {
                 "displaystyle": true,
                 "scriptlevel": 0},
               "properties": {},
               "childNodes": [
                 {"kind": "text",
                  "text": "2"}]}],
            "isInferred": true}]}],
      "isInferred": true}]}
);


parserTest = new ParserDigitsTest(patternEuropean);

parserTest.runTest(
  'Integer European', '2',
  {"kind":"math",
   "texClass":0,
   "attributes":{"display":"block"},
   "inherited":{"displaystyle":true,
                "scriptlevel":0},
   "properties":{},
   "childNodes":[
     {"kind":"mrow",
      "texClass":0,
      "attributes":{},
      "inherited":{
        "displaystyle":true,
        "scriptlevel":0},
      "properties":{},
      "childNodes":[
        {"kind":"mn",
         "texClass":0,
         "attributes":{},
         "inherited":{
           "displaystyle":true,
           "scriptlevel":0},
         "properties":{},
         "childNodes":[
           {"kind":"text",
            "text":"2"}]}],
      "isInferred":true}]}
);


parserTest.runTest(
  'Number European', '3,14',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {
        "displaystyle": true,
        "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "mn",
         "texClass": 0,
         "attributes": {},
         "inherited": {
           "displaystyle": true,
           "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "text",
            "text": "3,14"}]}],
      "isInferred": true}]}
);

parserTest.runTest(
  'Thousands European', '1{.}000,10',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {
        "displaystyle": true,
        "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "mn",
         "texClass": 0,
         "attributes": {},
         "inherited": {
           "displaystyle": true,
           "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "text",
            "text": "1.000,10"}]}],
      "isInferred": true}]}
);

parserTest.runTest(
  'Wrong Thousands', '1{.}0000,10',
  {"kind": "math",
   "texClass": 0,
   "attributes": {"display": "block"},
   "inherited": {"displaystyle": true,
                 "scriptlevel": 0},
   "properties": {},
   "childNodes": [
     {"kind": "mrow",
      "texClass": 0,
      "attributes": {},
      "inherited": {"displaystyle": true,
                    "scriptlevel": 0},
      "properties": {},
      "childNodes": [
        {"kind": "mn",
         "texClass": 0,
         "attributes": {},
         "inherited": {"displaystyle": true,
                       "scriptlevel": 0},
         "properties": {},
         "childNodes": [
           {"kind": "text",
            "text": "1.000"}]},
        {"kind": "mn",
          "texClass": 0,
          "attributes": {},
          "inherited": {"displaystyle": true,
            "scriptlevel": 0},
          "properties": {},
          "childNodes": [
            {"kind": "text",
              "text": "0,10"}]}],
      "isInferred": true}]}
);

