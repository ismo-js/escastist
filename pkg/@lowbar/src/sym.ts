import {Int} from "./int"

class Tgt {
    count = 0 as Int
}

export function sym(
    prefix :string,
    suffix :string = "",
) {
    return new Proxy(
        new Tgt(),
        {
            apply(
                tgt :Object,
                self :Object,
                args :any[],
            ) {

            },
            get(
                tgt :Object,
                prop :string | symbol,
                pxy :Object,
            ) {
                const count = () => ++(tgt as Tgt).count
                const propName = prop.toString()
                      || "#X" + count().toString(16)
                const name = `[${prefix} <${propName}> ${suffix}]`

                return Symbol(name)
            },
        },
    ) as {
        [key :string] :symbol
    }
}