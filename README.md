<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/plurid-data-structures-typescript/master/about/identity/plurid-logo.png" height="250px">
    <br />
    <br />
    <a target="_blank" href="https://www.npmjs.com/package/@plurid/plurid-data-structures">
        <img src="https://img.shields.io/npm/v/@plurid/plurid-data-structures.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
    </a>
    <a target="_blank" href="https://github.com/plurid/plurid-data-structures-typescript/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: DEL">
    </a>
</p>



<h1 align="center">
    plurid' data structures for typescript
</h1>


<h3 align="center">
    Utility data structures to be used in TypesScript projects.
</h3>



<br />



### Contents

+ [About](#about)
+ [Packages](#packages)
+ [Codeophon](#codeophon)



## About

The package contains the following data structures

+ [Cacher](#cacher)
+ [LinkedList](#linkedlist)
+ [PieceTable](#piecetable)


### Cacher

``` typescript
import {
    Cacher,
} from '@plurid/plurid-data-structures';


const cache = new Cacher<string>();

const a = cache.get('one') // undefined
cache.set('one', 'two'); // true
const b = cache.get('one') // 'two'

cache.unset('one') // true
cache.reset(); // true
```


### LinkedList

``` typescript
import {
    LinkedList,
} from '@plurid/plurid-data-structures';


const linkedList = new LinkedList();
linkedList.add(10);
linkedList.add(20);
```


###  PieceTable

``` typescript
import {
    PieceTable,
} from '@plurid/plurid-data-structures';

const pieceTable = new PieceTable('original string');
pieceTable.insert(' text', 15); // insert at index 15, the end
pieceTable.delete(8, 1); // delete at index 8, the space between 'original' and 'string'
const text = pieceTable.stringAt(0, 19); // 'originalstring text'
```



## Packages

<a target="_blank" href="https://www.npmjs.com/package/@plurid/plurid-data-structures">
    <img src="https://img.shields.io/npm/v/@plurid/plurid-data-structures.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/plurid-data-structures][plurid-data-structures]

[plurid-data-structures]: https://github.com/plurid/plurid-data-structures-typescript



## [Codeophon](https://github.com/ly3xqhl8g9/codeophon)

+ licensing: [delicense](https://github.com/ly3xqhl8g9/delicense)
+ versioning: [αver](https://github.com/ly3xqhl8g9/alpha-versioning)
