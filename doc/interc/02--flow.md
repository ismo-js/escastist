![– escastist –](https://raw.githubusercontent.com/ismo-js/escastist/master/var/ismo-escastist-icon.256.png)

# <small>(Package:)</small> interc`@`
### —*Overview*—
---

## :hash: Steps

+   `@`lex 
    -   **`∷`**:
        Lexical analysis
    -   **`↑`** per:
        Code point chunk
    -   **`+`**:
        8-bit unicode metadata flags
    -   **`←`**:
        `$<Word<8 | 16>>`
        UTF-8/16 char stream
    -   **`→`**:
        `$<Word<32>>`
        UTF-32 code point stream

+   `@`tok
    -   **`∷`**:
        Token analysis
    -   **`↑`** per:
        Source file
    -   **`→`**:
        `$<Word<8>>`
        Ascii raw stream;
        flat

+   `@`syn
    -   **`∷`**:
        Syntactic analysis
    -   **`↑`** per:
        Top level statement
    -   **`→`**:
        `$<Word<8>>`
        Ascii raw stream;
        nested

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