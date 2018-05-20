/*************************************************************
 *
 *  Copyright (c) 2017 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


/**
 * @fileoverview Base parsing methods for TeX Parsing.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import * as sitem from './StackItem.js';
import {Symbol} from './Symbol.js';
import TexParser from './TexParser.js';
import {TreeHelper} from './TreeHelper.js';
import {TexConstant} from './TexConstants.js';
import {ParseMethod, ParseInput} from './Types.js';
import {MmlNode} from '../../core/MmlTree/MmlNode.js';


namespace ParseMethods {

  /**
   *  Handle a variable (a single letter)
   */
  export function variable(parser: TexParser, c: string) {
    const def: sitem.EnvList = {};
    if (parser.stack.env['font']) {
      // @test Identifier Font
      def['mathvariant'] = parser.stack.env['font'];
    }
    // @test Identifier
    const node = parser.configuration.nodeFactory.create('token', 'mi', def, c);
    parser.Push(node);
  };


  /**
   *  Determine the extent of a number (pattern may need work)
   */
  export function digit(parser: TexParser, c: string) {
    let mml: MmlNode;
    const n = parser.string.slice(parser.i - 1).match(/^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)*|\.[0-9]+)/);
    const def: sitem.EnvList = {};
    if (parser.stack.env['font']) {
      // @test Integer Font
      def['mathvariant'] = parser.stack.env['font'];
    }
    if (n) {
      // @test Integer, Number
      mml = parser.configuration.nodeFactory.create('token', 'mn', def, n[0].replace(/[{}]/g, ''));
      parser.i += n[0].length - 1;
    } else {
      // @test Decimal
      mml = parser.configuration.nodeFactory.create('token', 'mo', def, c);
    }
    parser.Push(mml);
  };

  /**
   *  Lookup a control-sequence and process it
   */
  export function controlSequence(parser: TexParser, c: string) {
    const name = parser.GetCS();
    parser.parse('macro', [parser, name]);
  };

  //
  //  Look up a macro in the macros list
  //  (overridden in begingroup extension)
  //
  // csFindMacro: function(name) {return TEXDEF.macros[name]},
  //
  //  Handle normal mathchar (as an mi)
  //
  export function mathchar0mi(parser: TexParser, mchar: Symbol) {
        const def = mchar.attributes || {mathvariant: TexConstant.Variant.ITALIC};
    // @test Greek
    const node = parser.configuration.nodeFactory.create('token', 'mi', def, mchar.char);
    parser.Push(node);
  };

  //
  //  Handle normal mathchar (as an mo)
  //
  export function mathchar0mo(parser: TexParser, mchar: Symbol) {
        const def = mchar.attributes || {};
    def['stretchy'] = false;
    // @test Large Set
    const node = parser.configuration.nodeFactory.create('token', 'mo', def, mchar.char);
    TreeHelper.setProperty(node, 'fixStretchy', true);
    // PROBLEM: Attributes stop working when Char7 are explicitly set.
    parser.Push(node);
  };

  //
  //  Handle mathchar in current family
  //
  export function mathchar7(parser: TexParser, mchar: Symbol) {
        const def = mchar.attributes || {mathvariant: TexConstant.Variant.NORMAL};
    if (parser.stack.env['font']) {
      // @test MathChar7 Single Font
      def['mathvariant'] = parser.stack.env['font'];
    }
    // @test MathChar7 Single, MathChar7 Operator, MathChar7 Multi
    const node = parser.configuration.nodeFactory.create('token', 'mi', def, mchar.char);
    parser.Push(node);
  };

  //
  //  Handle delimiter
  //
  export function delimiter(parser: TexParser, delim: Symbol) {
    let def = delim.attributes || {};
    // @test Fenced2, Delimiter (AMS)
    def = Object.assign({fence: false, stretchy: false}, def);
    const node = parser.configuration.nodeFactory.create('token', 'mo', def, delim.char);
    parser.Push(node);
  };

  export function environment(parser: TexParser, env: string, func: Function, args: any[]) {
    const end = args[0];
    let mml = parser.itemFactory.create('begin').setProperties({name: env, end: end});
    mml = func.apply(null, [parser, mml].concat(args.slice(1)));
    parser.Push(mml);
  };

}

export default ParseMethods;
