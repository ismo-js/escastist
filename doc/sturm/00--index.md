![– escastist –](https://raw.githubusercontent.com/ismo-js/escastist/master/var/ismo-escastist-icon.256.png)

# <small>(Subproject:)</small> sturm`@`
## npm :paperclip: [`@escastist/sturm-*`](https://www.npmjs.com/package/@escastist)
### —*Overview*—
---

## :hash: Introduction

### Goals

### Explanation

### Approach

-   Primitive values cannot implement protocols
    →   Stream consists of **objects** (including functions) over time
    →   Primitive values are converted to an object implementing the ***raw* aspect**

-   Observers also implement the **counter aspect**
    →   `[second :Int48, increment :Int16]`


## :hash: Factory

```ts
//  Synchronous Stream:
declare $<E extends Object>(
    iterable :Iterable<E>,
) :Stream<E>

//  Synchronous Stream:
declare $<E extends Object>(
    iterable :AsyncIterable<E>,
) :Stream<E & Countable>

//  Abstracted Stream:
declare $<Fun extends Function>(
    fun :Fun,
) :Stream<Fun>
```


## :hash: Utilities

```ts
declare namespace $ {
    //  Unicode Point Stream:
    fromUnicode<Poi>(
    //… generic function accepts an Integer pseudotype for spefic integer typing
    //  or another type when using a parser callback
        codePoiStr :string,
        parser :(codePoi :number) => Poi =
            (codePoi :number) => codePoi as Poi,
    ) :Stream<Poi>
}
```