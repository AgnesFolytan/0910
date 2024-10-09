import { Controller, Get, Post, Render, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { datadto } from './data.dto';
import { Response } from 'express';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('forms')
  @Render('forms')
  getFizetes(){
    return{
        data: {},
        errors: []
    };
  }

  @Post('forms')
  orderPost(
    @Body() datadto: datadto,
    @Res() res: Response){
    let errors = [];

    if (!datadto.name) {
      errors.push("A nevet ki kell tölteni!");
    }

    if (typeof(datadto.accepted)== undefined) {
      errors.push("Bele kell egyezni!")
    }

    if(!datadto.bankcard){
      errors.push("Bankszámla szám megadása kötelező!")
    }else if(! /^\d{8}-\d{8}$/.test(datadto.bankcard)&&! /^\d{8}-\d{8}-\d{8}$/.test(datadto.bankcard)){
      errors.push('A bankszámla XXXXXXXX-XXXXXXXX formátumú vagy XXXXXXXX-XXXXXXXX-XXXXXXXX legyen! ')
  }

    if (errors.length > 0) {
      res.render('forms', {
        data: datadto,
        errors
      })
    }


    return res.redirect('/Success')
  }

  @Get('Success')
  Success(){
    return "Sikeres rendelés!"
  }
}
