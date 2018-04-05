
![– escastist –](https://raw.githubusercontent.com/ismo-js/escastist/master/var/ismo-escastist-icon.256.png)

# <small>(Package:)</small> interc`@`
### —*Ascii Raw Format*—
---

## :hash: Example

```
[x01]   // Header
        // Empty field name for element name spefification
[x1f]   // Unit Seperator 
elemName
[x1e]   // Record Seperator
kind
[x1f]   // Unit Seperator
a       // Statement
[x02]   // Content
081f916 // Code point incl. metadata & plane
085b    // Shortened code point without explicit plane
[x03]   // End
```