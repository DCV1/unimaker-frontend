const FRAMERATE = 10

export function moveDataTostring(filteredData, fn, evolve, ar, neg) {
  // (0.9 - 0.4 * tan(x)) * ar
  evolve = (evolve * 0.5).toString()
  ar = ar.toString()

  fn = evolve + '+' + ar + '*(' + fn + ')'

  if (neg) {
    fn = '-(' + fn + ')'
  }

  // 숫자값들의 normalize를 위해 max값을 빼온다.
  let max = Math.max(...filteredData) // for Normalise - maybe not ideal.

  filteredData = filteredData
    .map(x => x / max) // 0~1사이의 값으로 scaling
    .map(
      (x_value, ind) =>
        1 +
        ar * (neg ? -1 : 1) * (1 + 10 * Math.tan(x_value))
    )
    .map(value => Math.round(value * 1000) / 1000)
    .map((value, index) => {
      return `${index}: (${value})`
    }) // x를 리스트의 값, y를 리스트의 index로 치환
  // 그리고 해당 string을 math의 수식으로 계산

  return JSON.stringify(filteredData.join(', '))
}

export function filterData(audioBuffer) {
  /*
   * Average between channels.
   * Take abs so we don't have phase issues (and we eventually want absolute value anyway, for volume).
   */
  function addAbsArrayElements(a, b) {
    return a.map((e, i) => Math.abs(e) + Math.abs(b[i]))
  }

  let channels = []
  for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
    channels.push(audioBuffer.getChannelData(i))
  }

  const rawData = channels
    .reduce(addAbsArrayElements)
    .map(x => x / audioBuffer.numberOfChannels)
  // const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
  const samples = audioBuffer.duration * FRAMERATE //rawData.length; // Number of samples we want to have in our final data set

  // mksoo
  // deforum_settings['max_frames'] = Math.floor(samples)

  const blockSize = Math.floor(rawData.length / samples) // Number of samples in each subdivision
  var filteredData = []

  for (let i = 0; i < samples; i++) {
    let chunk = rawData.slice(i * blockSize, (i + 1) * blockSize - 1)
    let sum = chunk.reduce((a, b) => a + b, 0)
    filteredData.push(sum / chunk.length)
  }

  // 위에는 모르겠고, 여기부터 4줄은 수학식 적용시킴
  // let string = filteredDataTostring(filteredData, FN);

  // keyframeOutput.innerHTML = string; // 너무 길어서 출력안됨
  // keyframeOutput.textContent = string;

  return { filteredData, maxFrames: Math.floor(samples) }
}

export function filteredDataTostring(filteredData, fn, evolve, ar) {
  evolve = (evolve * 0.01).toString()
  ar = ar.toString()

  fn = evolve + '+' + ar + '*(' + fn + ')'

  // 숫자값들의 normalize를 위해 max값을 빼온다.
  let max = Math.max(...filteredData) // for Normalise - maybe not ideal.

  filteredData = filteredData
    .map(x => x / max) // 0~1사이의 값으로 scaling
    .map(
      (x_value, ind) => ar * (0.9 - 0.4 * Math.tan(x_value))
      // math.eval(fn.replace('x', x_value).replace('y', ind))
    )
    .map(value => Math.round(value * 1000) / 1000) // x를 리스트의 값, y를 리스트의 index로 치환
    .map((value, index) => {
      return `${index}: (${value})`
    })
  // 그리고 해당 string을 math의 수식으로 계산

  return JSON.stringify(filteredData.join(', '))
}

// TODO 이거 고치는 거부터
/* 여기서 dataType: [zoom, rotate] */
export function dataTostringUniversal(filteredData, dataType, ar, neg) {
  // (0.9 - 0.4 * tan(x)) * ar


  // 숫자값들의 normalize를 위해 max값을 빼온다.
  let max = Math.max(...filteredData) // for Normalise - maybe not ideal.

  filteredData = filteredData
    .map(x => x / max) // 0~1사이의 값으로 scaling
    .map(
      (x_value, ind) =>{
        let result = 0;
        switch(dataType) {
          case "zoom":
            result = 1 + ar * neg * (0.04 * Math.tan(x_value));
            break;
          case "rotate":
            result = ar * neg * (4 * Math.tan(x_value));
            break;
        }
        return result;
      }
    )
    .map(value => Math.round(value * 1000) / 1000)
    .map((value, index) => {
      // console.log(value, index)
      return `${index}: (${value})`
    }) // x를 리스트의 값, y를 리스트의 index로 치환
  // 그리고 해당 string을 math의 수식으로 계산
  return JSON.stringify(filteredData.join(', '))
}
