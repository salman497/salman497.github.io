export const customCodeHandler = (code, language) => {
  // if (language === 'html') {
  //   return code;
  // }
  if (language === "chartjs") {
    // INFO: maybe set height and width are to work around bug https://github.com/chartjs/Chart.js/issues/5805
    return `<div><div style="display: flex; align-items: center; justify-content: center; position: relative; width: 100%; height: 100%;"><canvas data-chartjs=${
          btoa(code)
        }></canvas></div></div>`;
  }

  if (
    language === "apexchart"
  ) {
    // INFO: height and width are set to work around bug https://github.com/chartjs/Chart.js/issues/5805
    return `<div data-apexchart=${btoa(code)}></div>`;
  }

  return undefined;
}
