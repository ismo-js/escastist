//  $ → Stream

//   Generates 
declare function drop<E>(e :E) :Drop
//…  A drop symbol corresponding to the current element will
//   not be produced, but instead dropped from the stream

export default function () {
    const dub$ = $([0, 1, 0, 2, 0, 4, 0, 8, 0, 16])
        |> $((e :Int) => e * 2)
        //… a stream constantly consiting of a function. This stream
        //  is applieable (thanks to `$` proxification)
        |> $((e :Int) => e === 0 ? drop(e) : e)
}