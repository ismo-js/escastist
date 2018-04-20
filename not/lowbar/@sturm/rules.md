## :hash: Design Goals

-   Primitive values cannot implement protocols
    →   Stream consists of **objects** (including functions) over time
    →   Primitive values are converted to an object implementing the ***raw* aspect**

-   Observers also implement the **counter aspect**
    →   `[second :Int48, increment :Int16]`