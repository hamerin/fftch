import { AttachmentIcon, DownloadIcon, MoonIcon, RepeatIcon, SunIcon, ViewIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Box, Button, chakra, Checkbox, CheckboxGroup, Container, Divider, Flex, FormControl, FormLabel, Heading, HStack, IconButton, Image as CImage, Input, InputGroup, InputLeftAddon, InputRightAddon, Link, Radio, RadioGroup, Select, Spacer, Textarea, useBreakpointValue, useColorMode, useColorModeValue, useMediaQuery, VStack, Wrap } from "@chakra-ui/react";
import { Assets } from "@pixi/assets";
import { Application, Rectangle, Resource, Texture } from "pixi.js";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sheet } from "./components/Sheet";
import { RootState } from "./reducers";
import { resetColors, resetConfig, setFrame, setGradient, setHighlightColor, setMarkerColor, setMarkerVariant, setWatermarkColor } from "./reducers/config";
import { resetFreeCompany, setAccessTimes, setDescription, setFavContents, setFreeCompanyAbbr, setFreeCompanyName, setGrandCompany, setLevel, setMainJob, setName, setRace, setServer, setSpecialistJob, setStatus } from "./reducers/info";
import { allAccessTimes, allCasterJobs, allContents, allCraftingJobs, allGatheringJobs, allGrandCompanies, allHealerJobs, allMeleeJobs, allRaceStrings, allRangedJobs, allStatuses, allTankJobs } from "./utils/constants";
import { intToRGB, min, RGBToint } from "./utils/helpers";

const App: React.FC = () => {
  const [app, setApp] = useState<Application | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [backgroundTexture, setBackgroundTexture] = useState<Texture<Resource> | null>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const { info, config } = useSelector((state: RootState) => state);

  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const componentSize = useBreakpointValue({ base: "sm", md: "md" });
  const spacing = useBreakpointValue({ base: 2, md: 3 });
  const { colorMode, toggleColorMode } = useColorMode();
  const jobColors = useColorModeValue(
    ["blue.100", "green.100", "red.100", "red.100", "red.100", "gray.100", "gray.100"] as const,
    ["blue.700", "green.700", "red.700", "red.700", "red.700", "gray.700", "gray.700"] as const
  );
  const linkColor = useColorModeValue("pink.500" as const, "pink.200" as const);

  return (
    <Container maxW='container.lg' px={4} py={4}>
      <VStack spacing={{ base: 4, md: 5 }} align='normal'>
        <chakra.input
          type='file' accept='image/*'
          display='none'
          ref={fileInputRef}
          onChange={e => {
            if (e.target.files) {
              setUploadLoading(true);
              setBackgroundTexture(null);
              const fileReader = new FileReader();
              fileReader.readAsDataURL(e.target.files[0]);
              fileReader.addEventListener("load", async function () {
                const src = this.result as string;

                const texture = await Assets.load(src) as Texture<Resource>;
                if (texture) {
                  const width = texture.width;
                  const height = texture.height;
                  const expectWidth = min(width, height * 1920 / 1080);
                  const expectHeight = min(width * 1080 / 1920, height);

                  texture.frame = new Rectangle(
                    (width - expectWidth) / 2,
                    (height - expectHeight) / 2,
                    expectWidth,
                    expectHeight
                  );
                  texture.updateUvs();

                  setBackgroundTexture(texture);
                  setUploadLoading(false);

                  if (app === null) return;
                  setImage(app.renderer.plugins.extract.base64(app.stage));
                }
              });
            }
          }}
        />

        <Flex gap={spacing}>
          <Heading size={componentSize} alignSelf='flex-end'>
            빛의 테마 트친소 시트 생성기
          </Heading>
          <Spacer />
          <IconButton
            size={componentSize}
            variant='link'
            aria-label='Toggle Color Mode'
            icon={colorMode !== "light" ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
          />
        </Flex>

        <Divider />

        <Flex gap={spacing}>
          <FormControl size={componentSize}>
            <FormLabel fontSize={componentSize}>닉네임</FormLabel>
            <Input
              size={componentSize}
              type='text'
              placeholder='닉네임'
              value={info.name}
              onChange={e => dispatch(setName(e.target.value))}
            />
          </FormControl>
          <FormControl size={componentSize}>
            <FormLabel fontSize={componentSize}>서버</FormLabel>
            <Input
              size={componentSize}
              type='text'
              placeholder='서버'
              value={info.server}
              onChange={e => dispatch(setServer(e.target.value))}
            />
          </FormControl>
        </Flex>

        <Flex gap={spacing}>
          <FormControl size={componentSize}>
            <FormLabel fontSize={componentSize}>
              총사령부
            </FormLabel>
            <Select
              size={componentSize}
              value={info.grandcompany ?? ""}
              onChange={e => dispatch(setGrandCompany(e.target.value))}
            >
              <option value=''>표시하지 않음</option>
              {allGrandCompanies.map(x => <option value={x} key={x}>{x}</option>)}
            </Select>
          </FormControl>
          <FormControl size={componentSize}>
            <FormLabel fontSize={componentSize}>
              자유부대
              <Checkbox
                ml={spacing}
                colorScheme='pink'
                size={componentSize}
                isChecked={info.freecompany !== undefined}
                onChange={e => {
                  if (!e.target.checked) dispatch(resetFreeCompany());
                  else dispatch(setFreeCompanyAbbr(""));
                }}
              >
                표시
              </Checkbox>
            </FormLabel>
            <Flex gap={spacing}>
              <Input
                size={componentSize}
                type='text'
                placeholder='이름'
                value={info.freecompany?.name ?? ""}
                onChange={e => dispatch(setFreeCompanyName(e.target.value))}
              />
              <InputGroup size={componentSize}>
                <InputLeftAddon display={{ base: "none", md: "flex" }} backgroundColor='transparent'>≪</InputLeftAddon>
                <Input
                  type='text'
                  placeholder='약칭'
                  value={info.freecompany?.abbr ?? ""}
                  onChange={e => dispatch(setFreeCompanyAbbr(e.target.value))}
                />
                <InputRightAddon display={{ base: "none", md: "flex" }} backgroundColor='transparent'>≫</InputRightAddon>
              </InputGroup>
            </Flex>
          </FormControl>
        </Flex>

        <Flex gap={spacing}>
          <FormControl size={componentSize}>
            <FormLabel fontSize={componentSize}>
              상태
            </FormLabel>
            <Select
              size={componentSize}
              value={info.status ?? ""}
              onChange={e => dispatch(setStatus(e.target.value))}
            >
              <option value=''>표시하지 않음</option>
              {allStatuses.map(x => <option value={x} key={x}>{x}</option>)}
            </Select>
          </FormControl>
          <FormControl size={componentSize}>
            <FormLabel fontSize={componentSize}>
              종족
            </FormLabel>
            <Select
              size={componentSize}
              value={info.race ? `${info.race.race} | ${info.race.subrace} | ${info.race.gender}` : ""}
              onChange={e => dispatch(setRace(e.target.value))}
            >
              <option value=''>표시하지 않음</option>
              {allRaceStrings.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </FormControl>
        </Flex>

        <FormControl size={componentSize}>
          <FormLabel fontSize={componentSize}>
            접속 시간대
          </FormLabel>
          <CheckboxGroup
            colorScheme='pink'
            size={componentSize}
            value={info.accesstimes}
            onChange={v => dispatch(setAccessTimes(v as string[]))}
          >
            <Wrap spacing={spacing}>
              {allAccessTimes.map(x => <Checkbox value={x} key={x}>{x}</Checkbox>)}
            </Wrap>
          </CheckboxGroup>
        </FormControl>

        <FormControl size={componentSize}>
          <FormLabel fontSize={componentSize}>
            주로 즐기는 컨텐츠
          </FormLabel>
          <CheckboxGroup
            colorScheme='pink'
            size={componentSize}
            value={info.favcontents}
            onChange={v => dispatch(setFavContents(v as string[]))}
          >
            <Wrap spacing={spacing}>
              {allContents.map(x => <Checkbox value={x} key={x}>{x}</Checkbox>)}
            </Wrap>
          </CheckboxGroup>
        </FormControl>

        <FormControl size={componentSize}>
          <FormLabel fontSize={componentSize}>
            레벨
          </FormLabel>
          <VStack spacing={spacing} align={"normal"}>
            {
              [allTankJobs, allHealerJobs, allMeleeJobs, allRangedJobs, allCasterJobs, allCraftingJobs, allGatheringJobs].map((jobs, idx) => (
                <Wrap key={`jobs${idx}`} spacing={spacing}>
                  {
                    jobs.map(j => (
                      <InputGroup key={j} size={componentSize} w={{ base: 125, md: 175 }}>
                        <InputLeftAddon backgroundColor={jobColors[idx]}>{j}</InputLeftAddon>
                        <Input
                          type='number'
                          value={info.levels[j]?.toString() ?? ""}
                          onChange={e => dispatch(setLevel({
                            job: j,
                            level: parseInt(e.target.value)
                          }))}
                        />
                      </InputGroup>
                    ))
                  }
                </Wrap>
              ))
            }
          </VStack>
        </FormControl>

        <FormControl size={componentSize}>
          <FormLabel fontSize={componentSize}>
            주직업
          </FormLabel>
          <CheckboxGroup
            colorScheme='pink'
            size={componentSize}
            value={info.markers.main}
            onChange={v => dispatch(setMainJob(v as string[]))}
          >
            <Wrap spacing={spacing}>
              {[...allTankJobs, ...allHealerJobs, ...allMeleeJobs, ...allRangedJobs, ...allCasterJobs].map(x => <Checkbox value={x} key={x}>{x}</Checkbox>)}
            </Wrap>
          </CheckboxGroup>
        </FormControl>

        <FormControl size={componentSize}>
          <FormLabel fontSize={componentSize}>
            전문장인
          </FormLabel>
          <CheckboxGroup
            colorScheme='pink'
            size={componentSize}
            value={info.markers.specialist}
            onChange={v => dispatch(setSpecialistJob(v as string[]))}
          >
            <Wrap spacing={spacing}>
              {allCraftingJobs.map(x => <Checkbox value={x} key={x}>{x}</Checkbox>)}
            </Wrap>
          </CheckboxGroup>
        </FormControl>


        <FormControl size={componentSize}>
          <FormLabel fontSize={componentSize}>
            소개말
          </FormLabel>
          <Textarea
            size={componentSize}
            placeholder='하고 싶은 말을 적어주세요!'
            value={info.description}
            onChange={e => dispatch(setDescription(e.target.value))}
          />
        </FormControl>

        <Divider />

        <Flex gap={spacing ? spacing * 2 : undefined}>
          <Button
            size={componentSize}
            leftIcon={<RepeatIcon />}
            colorScheme='pink'
            variant='link'
            onClick={() => dispatch(resetConfig())}
          >
            모든 디자인 설정 초기화
          </Button>
          <Button
            size={componentSize}
            leftIcon={<RepeatIcon />}
            colorScheme='pink'
            variant='link'
            onClick={() => dispatch(resetColors())}
          >
            색상 초기화
          </Button>
        </Flex>

        <Alert status='warning' fontSize={componentSize} px={{ base: 3, md: 4 }} py={{ base: 2, md: 3 }}>
          <AlertIcon boxSize={{ base: "1.3125rem", md: "1.5rem" }} />
          주직업/전문장인 표시 방식을 {"'잡 아이콘 테두리'"}로 설정할 경우, 일부 직업에 대해 해당 요소가 다른 요소와 겹칠 수 있습니다.
        </Alert>
        <Alert status='info' fontSize={componentSize} px={{ base: 3, md: 4 }} py={{ base: 2, md: 3 }}>
          <AlertIcon boxSize={{ base: "1.3125rem", md: "1.5rem" }} />
          시간대/컨텐츠 강조색은 곱하기 모드로 혼합되므로, 설정한 색이 그대로 나타나지 않습니다.
        </Alert>
        <Alert status='info' fontSize={componentSize} px={{ base: 3, md: 4 }} py={{ base: 2, md: 3 }}>
          <AlertIcon boxSize={{ base: "1.3125rem", md: "1.5rem" }} />
          워터마크 색을 배경과 충분히 대비되게 설정하는 것을 권장합니다.
        </Alert>

        <FormControl size={componentSize}>
          <FormLabel fontSize={componentSize}>
            주직업/전문장인 표시 방식
          </FormLabel>
          <RadioGroup
            size={componentSize}
            colorScheme='pink'
            value={config.markervariant}
            onChange={v => dispatch(setMarkerVariant(v))}
          >
            <HStack spacing={spacing}>
              <Radio value='icon'>잡 아이콘 테두리</Radio>
              <Radio value='text'>레벨 텍스트 색</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <Flex gap={spacing}>
          <FormControl size={componentSize}>
            <FormLabel fontSize={componentSize}>
              액자
            </FormLabel>
            <Select
              size={componentSize}
              value={config.frame ?? ""}
              onChange={e => dispatch(setFrame(e.target.value))}
            >
              <option value=''>없음</option>
              <option value='elegant'>우아하게</option>
              <option value='simple'>심플하게</option>
            </Select>
          </FormControl>
          <FormControl size={componentSize}>
            <FormLabel fontSize={componentSize}>
              배경 그라디언트
            </FormLabel>
            <Select
              size={componentSize}
              value={config.gradient ?? ""}
              onChange={e => dispatch(setGradient(e.target.value))}
            >
              <option value=''>없음</option>
              <option value='ivory'>아이보리색</option>
              <option value='gray'>회색</option>
            </Select>
          </FormControl>
        </Flex>
        {
          isLargerThan480 ?
            <Flex gap={spacing}>
              <FormControl size={componentSize}>
                <FormLabel fontSize={componentSize}>
                  워터마크 색
                </FormLabel>
                <Input
                  type='color'
                  size={componentSize}
                  value={intToRGB(config.watermarkColor)}
                  onChange={e => dispatch(setWatermarkColor(RGBToint(e.target.value)))}
                />
              </FormControl>
              <FormControl size={componentSize}>
                <FormLabel fontSize={componentSize}>
                  시간대/컨텐츠 강조색
                </FormLabel>
                <Input
                  type='color'
                  size={componentSize}
                  value={intToRGB(config.highlightColor)}
                  onChange={e => dispatch(setHighlightColor(RGBToint(e.target.value)))}
                />
              </FormControl>
              <FormControl size={componentSize}>
                <FormLabel fontSize={componentSize}>
                  주직업/전문장인 강조색
                </FormLabel>
                <Input
                  type='color'
                  size={componentSize}
                  value={intToRGB(config.markerColor)}
                  onChange={e => dispatch(setMarkerColor(RGBToint(e.target.value)))}
                />
              </FormControl>
            </Flex> :
            <>
              <FormControl size={componentSize}>
                <FormLabel fontSize={componentSize}>
                  워터마크 색
                </FormLabel>
                <Input
                  type='color'
                  size={componentSize}
                  value={intToRGB(config.watermarkColor)}
                  onChange={e => dispatch(setWatermarkColor(RGBToint(e.target.value)))}
                />
              </FormControl>
              <FormControl size={componentSize}>
                <FormLabel fontSize={componentSize}>
                  시간대/컨텐츠 강조색
                </FormLabel>
                <Input
                  type='color'
                  size={componentSize}
                  value={intToRGB(config.highlightColor)}
                  onChange={e => dispatch(setHighlightColor(RGBToint(e.target.value)))}
                />
              </FormControl>
              <FormControl size={componentSize}>
                <FormLabel fontSize={componentSize}>
                  주직업/전문장인 강조색
                </FormLabel>
                <Input
                  type='color'
                  size={componentSize}
                  value={intToRGB(config.markerColor)}
                  onChange={e => dispatch(setMarkerColor(RGBToint(e.target.value)))}
                />
              </FormControl>
            </>
        }

        <Divider />

        {
          image &&
          <Alert status='warning' fontSize={componentSize} px={{ base: 3, md: 4 }} py={{ base: 2, md: 3 }}>
            <AlertIcon boxSize={{ base: "1.3125rem", md: "1.5rem" }} />
            만약 미리보기가 작동하지 않을 경우 애드블록을 끄고 다시 시도해 주시기 바랍니다.
          </Alert>
        }
        {image && <CImage src={image} />}

        <Flex gap={spacing}>
          <Button
            size={componentSize}
            colorScheme='pink'
            variant='outline'
            leftIcon={<AttachmentIcon />}
            isLoading={uploadLoading}
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          >
            배경 업로드
          </Button>
          <Spacer />
          <Button
            size={componentSize}
            leftIcon={<ViewIcon />}
            colorScheme='pink'
            variant='outline'
            onClick={() => {
              if (app === null) return;
              setImage(app.renderer.plugins.extract.base64(app.stage));
            }}
          >
            미리보기
          </Button>
          <Button
            size={componentSize}
            leftIcon={<DownloadIcon />}
            colorScheme='pink'
            onClick={() => {
              if (app === null) return;
              const base64 = app.renderer.plugins.extract.base64(app.stage);
              setImage(base64);

              const link = document.createElement("a");
              link.href = base64;
              link.download = `${Date.now()}.png`;
              link.click();
              link.remove();
            }}
          >
            다운로드
          </Button>
        </Flex>

        <Sheet
          hidden
          scale={1}
          setApp={setApp}
          backgroundTexture={backgroundTexture}
          info={info}
          config={config}
        />

        <Box pt={{ base: 9, md: 10 }} fontSize={{ base: "xs", md: "sm" }} color='gray.500'>
          기재되어있는 회사 명 · 제품명 · 시스템 이름은 해당 소유자의 상표 또는 등록 상표입니다.<br />
          ⓒ 2010 - 2022 SQUARE ENIX CO., LTD All Rights Reserved. Korea Published by Actoz Soft.<br />
          디자인{" "}<Link href='https://twitter.com/Archiving_Snow' color={linkColor}>@Archiving_Snow</Link>
          {"  /  "}개발{" "}<Link href='https://twitter.com/_niremah' color={linkColor}>@_niremah</Link>
        </Box>
      </VStack>
    </Container>
  );
};

export default App;
