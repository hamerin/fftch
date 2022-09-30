import { Sprite, Stage, Text } from "@inlet/react-pixi";
import { Application, BLEND_MODES, Resource, TextMetrics, TextStyle, Texture } from "pixi.js";
import React from "react";
import useFontFaceObserver from "use-font-face-observer";
import structure from "../images/structure.png";
import watermark from "../images/watermark.png";
import { accessTimeImageRecord, contentImageRecord, frameImageRecord, gradientImageRecord, grandCompanyImageRecord, levelPositionX, levelPositionY, markerImageRecord, statusImageRecord } from "../utils/constants";
import { intToRGB } from "../utils/helpers";
import { Job, SheetConfig, SheetInfo } from "../utils/types";

type Props = {
  hidden?: boolean,
  setApp?: React.Dispatch<React.SetStateAction<Application | null>>,
  scale: number,
  backgroundTexture: Texture<Resource> | null,
  info: SheetInfo,
  config: SheetConfig
}

export const Sheet: React.FC<Props> = (props: Props) => {
  const { hidden, setApp, scale, backgroundTexture, info, config } = props;

  const isFontLoaded = useFontFaceObserver([{ family: "GMarket Sans TTF" }, { family: "NanumSquare" }, { family: "Lora" }]);
  if (!isFontLoaded) return (<></>);

  const titleStyle = new TextStyle({
    fontFamily: "GMarket Sans TTF",
    fill: ["#483123"],
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -60 * scale * 0.05,
    fontSize: 60 * scale
  });

  const serverStyle = new TextStyle({
    fontFamily: "GMarket Sans TTF",
    fill: ["#704b36"],
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -30 * scale * 0.05,
    fontSize: 30 * scale
  });

  const textStyle = new TextStyle({
    fontFamily: "NanumSquare",
    fill: ["#704b36"],
    fontWeight: "700",
    fontStyle: "normal",
    letterSpacing: -20 * scale * 0.05,
    fontSize: 20 * scale
  });

  const levelStyle = new TextStyle({
    fontFamily: "Lora",
    fill: ["#704b36"],
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: 20 * scale
  });

  const levelMarkerStyle = new TextStyle({
    fontFamily: "Lora",
    fill: [intToRGB(config.markerColor)],
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: 20 * scale
  });

  const titleWidth = info.name !== "" ? TextMetrics.measureText(info.name, titleStyle).width : 0;

  const freecompanyText = info.freecompany ? `${info.freecompany.name} ≪${info.freecompany.abbr}≫` : undefined;
  const raceText = info.race ? `${info.race.race}  l  ${info.race.subrace} (${info.race.gender})` : undefined;

  return (
    <Stage
      hidden={hidden}
      raf={false}
      renderOnComponentChange={true}
      width={1920 * scale} height={1080 * scale}
      options={{
        antialias: true,
        backgroundAlpha: 0
      }}
      onMount={setApp}
    >
      {
        backgroundTexture &&
        <Sprite
          texture={backgroundTexture}
          width={1920 * scale} height={1080 * scale}
          anchor={[0.5, 0.5]}
          x={960 * scale} y={540 * scale}
          zIndex={0}
        />
      }

      {
        config.gradient &&
        <Sprite
          image={gradientImageRecord[config.gradient]}
          scale={scale}
          zIndex={1}
        />
      }
      {
        config.frame &&
        <Sprite
          image={frameImageRecord[config.frame]}
          scale={scale}
          zIndex={2}
        />
      }
      <Sprite
        image={structure}
        scale={scale}
        zIndex={2}
      />
      <Sprite
        image={watermark}
        tint={config.watermarkColor}
        scale={scale}
        zIndex={2}
      />
      {
        info.name !== "" &&
        <Text
          text={info.name}
          style={titleStyle}
          x={113 * scale} y={(-14 + 173.75) * scale}
          zIndex={3}
        />
      }
      <Text
        text={`@ ${info.server}`}
        style={serverStyle}
        x={(289 - 167.15) * scale + titleWidth} y={(-5 + 198.75) * scale}
        zIndex={3}
      />
      {
        info.grandcompany &&
        <Sprite
          image={grandCompanyImageRecord[info.grandcompany]}
          scale={scale}
          zIndex={3}
        />
      }
      {
        freecompanyText &&
        <Text
          text={freecompanyText}
          style={textStyle}
          x={422.5 * scale} y={(-4.5 + 258.4) * scale}
          zIndex={3}
        />
      }
      {
        info.status &&
        <Sprite
          image={statusImageRecord[info.status]}
          scale={scale}
          zIndex={3}
        />
      }
      {
        raceText &&
        <Text
          text={raceText}
          style={textStyle}
          x={387 * scale} y={(-4.5 + 303) * scale}
          zIndex={3}
        />
      }
      {
        info.accesstimes.map(idx => (
          <Sprite
            key={`accesstime${idx}`}
            image={accessTimeImageRecord[idx]}
            tint={config.highlightColor}
            blendMode={BLEND_MODES.MULTIPLY}
            scale={scale}
            zIndex={3}
          />
        ))
      }
      {
        info.favcontents.map(idx => (
          <Sprite
            key={`content${idx}`}
            image={contentImageRecord[idx]}
            tint={config.highlightColor}
            blendMode={BLEND_MODES.MULTIPLY}
            scale={scale}
            zIndex={3}
          />
        ))
      }
      {
        Object.entries<number>(info.levels).map(([k, v]) => {
          const j = k as Job;
          const l = `${v}`;
          const h = config.markervariant === "text"
            && (
              (info.markers.main as Job[]).includes(j)
              || (info.markers.specialist as Job[]).includes(j)
            );
          const metrics = TextMetrics.measureText(l, levelStyle);

          return (<Text
            key={`level${j}`}
            text={l}
            style={h ? levelMarkerStyle : levelStyle}
            pivot={[metrics.width / 2, 0]}
            x={levelPositionX[j] * scale} y={(-3 + levelPositionY[j]) * scale}
            zIndex={3}
          />);
        })
      }
      {
        config.markervariant === "icon" && info.markers.main.map((j, idx) => (
          <Sprite
            key={`main${idx}`}
            image={markerImageRecord["main"]}
            tint={config.markerColor}
            anchor={[0.5, 1]}
            scale={scale}
            x={levelPositionX[j] * scale} y={(levelPositionY[j]) * scale}
            zIndex={3}
          />
        ))
      }
      {
        config.markervariant === "icon" && info.markers.specialist.map((j, idx) => (
          <Sprite
            key={`specialist${idx}`}
            image={markerImageRecord["specialist"]}
            tint={config.markerColor}
            anchor={[0.5, 1]}
            scale={scale}
            x={levelPositionX[j] * scale} y={(levelPositionY[j]) * scale}
            zIndex={3}
          />
        ))
      }
      {
        info.description !== "" &&
        <Text
          text={info.description}
          style={textStyle}
          x={118.12 * scale} y={(-4.5 + 907.19) * scale}
          zIndex={3}
        />
      }
    </Stage>
  );
};
