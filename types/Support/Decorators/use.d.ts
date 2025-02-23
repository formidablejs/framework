type Descriptor<D = object> = {
  value: D
  writable: boolean
  enumerable: boolean
  configurable: boolean
}

function DI<T = object, D = object, P = any[]>(
  target: T,
  key: string,
  descriptor: Descriptor<D>,
  paramaters: P
)

function use<T = any[]>(...objects: T);

function αuse<T = any[]>(...objects: T);

export {
  use,
  αuse,
  DI
}
