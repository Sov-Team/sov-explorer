import streamSaver from 'streamsaver'

export function FileStream (fileName) {
  const fileStream = streamSaver.createWriteStream(fileName)
  const writer = fileStream.getWriter()
  const write = text => {
    const chunk = new TextEncoder().encode(text)
    return writer.write(chunk)
  }
  const close = () => {
    return writer.close()
  }
  const abort = () => {
    return writer.abort()
  }

  return Object.freeze({ write, close, abort })
}
