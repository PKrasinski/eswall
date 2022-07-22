import { Wall } from "@eswall/canvas"
import { Application } from "@eswall/core"
import { addMetadataFromBase64DataURI, getMetadata } from 'meta-png'

// functions from https://stackoverflow.com/questions/3316762/what-is-deserialize-and-serialize-in-json
function toBinary(string: string) {
    const codeUnits = new Uint16Array(string.length)
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i)
    }
    return window.btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)))
}

function fromBinary(encoded: string) {
    const binary = window.atob(encoded)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return String.fromCharCode(...new Uint16Array(bytes.buffer))
}

// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri: string, name: string) {
    var link = document.createElement('a')
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export class FileAdapter {
    constructor (
        private app: Application,
        private canvas: Wall
    ) {}

    save (name: string) {
        const pngDataURL = this.canvas.toPNGDataURL()
        const data = this.app.export()
        const dataBinary = toBinary(data)

        const pngDataURLWithMetadata = addMetadataFromBase64DataURI(pngDataURL, 'Data', dataBinary)

        downloadURI(pngDataURLWithMetadata, name)
    }

    import (file: ArrayBuffer) {
        const dataBinary = getMetadata(new Uint8Array(file), 'Data')
        if (!dataBinary) return false
        const data = fromBinary(dataBinary)
        this.app.import(data)
    }
}