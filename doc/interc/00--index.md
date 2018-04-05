![– escastist –](https://raw.githubusercontent.com/ismo-js/escastist/master/var/ismo-escastist-icon.256.png)

# <small>(Package:)</small> interc`@`
### —*Overview*—
---

## :hash: Steps

+   `@`lex 
    -   **`∷`**:
        Lexical analysis
    -   **`↑`**:
        per code point chunk
    -   **`←`**:
        `$<Word<8 | 16>>`
        utf-8/16 char stream
    -   **`→`**:
        `$<Word<32>>`
        utf-32 code point stream

+   `@`tok
    -   **`∷`**:
        Token analysis

+   `@`syn
    -   **`∷`**:
        Syntactic analysis

+   `@`sem
    -   **`∷`**:
        Semantic analysis

## :hash: Symbol legend
*   **`∷`**:
    = Action type
*   **`↑`**:
    = Scaling
*   **`←`**:
    = Input
*   **`→`**:
    = Output