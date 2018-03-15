export type Prop = string | symbol

export function isStr(a :any) :a is string {
    return "string" === typeof a
}
export function areStr(a :any) :a is string[] {
    return Array.isArray(a) && a.every((e :any) =>
        "string" === typeof e
    )
}
export const fromPoi = String.fromCodePoint