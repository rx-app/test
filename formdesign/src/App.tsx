import React, {FC} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FullPage, {Header, Footer, Main} from "./component/layout/FullPage";
import FromPaper from "./component/FormPaper";
import Toolbar, {Group as ToolGroup, Item as ToolItem} from "./component/Toolbar";
// import AddText from "./temp/AddText";
// import SetPaperType from "./temp/SetPaperType";
// import SetDialogType from "./temp/setDialogType";
// import {SelectAll, ReverseSelect, ClearSelection} from "./temp/selection";
// import {addCell1, addCell2, setCell, addCell3, addCell3x3} from "./temp/addCell";

import SingleButton from "./component/template/button";
import ColorButton from "./component/template/colorButton";
import SetAttribute from "./component/template/setAttribute";
import Select from "./component/template/select";
import IconButton from "./component/template/iconButton";




const useStyles = makeStyles(() => ({
    title: {
        height: 50,
        lineHeight: "50px",
        fontSize: 18,
        background: "#eef0f5",
        borderBottom: "1px solid #dcdce5"
    },
    line: {
        background: "f5f6f8",
        padding: "8px",
        height: "30px",
        borderBottom: "1px solid #dcdce5",
    },
    wrap: {
        "&:after": {
            float: "left",
            width: "1px",
            height: "20px",
            content: "''",
            margin: "5px 10px",
            backgroundColor: "#dcdce5",
        },
        "& div[class^='Input-select']": {
            border: 0,
            background: "transparent",
            float: "left",
            width: "auto",
        }
    },
}));
/* eslint-disable max-len */
const App: FC = function App() {
    const classes = useStyles();
    const data = {
        ziti: [{value: "微软雅黑", key: "微软雅黑"}, {value: "微软雅黑1", key: "微软雅黑1"}],
        zihao: [{value: "14", key: "14"}, {value: "15", key: "15"}],
        cuizhiduiqi: [{value: "右对齐", key: "#icon-youduiqi"}, {value: "垂直对齐", key: "#icon-chuizhiduiqi"}, {value: "左对齐", key: "#icon-zuoduiqi"}],
        shuipingduiqi: [{value: "顶部对齐", key: "#icon-dingduiqi"}, {value: "水平对齐", key: "#icon-shuipingduiqi"}, {value: "底部对其", key: "#icon-diduiqi"}]
    }
    return (
        <FullPage>
            <SetAttribute />
            <Header>
                <div id="title" className={classes.title}>这里是标题</div>
                <Toolbar>
                    <ToolGroup>
                        {/* {SetDialogType("0", ["0"])}
                        {SetDialogType("1", ["1"])}
                        {SetDialogType("2", ["2"])}
                        {SetDialogType("3", ["3"])}
                        {SetPaperType("A3")}
                        {SetPaperType("A4")}
                        {AddText()}
                        {ClearSelection()}
                        {ReverseSelect()}
                        {SelectAll()}
                        {addCell1()}
                        {addCell2()}
                        {addCell3()}
                        {setCell()}
                        {addCell3x3()} */}
                        <ToolItem>
                            <div className={classes.wrap}>
                                <IconButton title="绘制表格" action="绘制表格" icon="#icon-huizhibiaoge" />
                            </div>
                        </ToolItem>
                        <ToolItem>
                            <div className={classes.wrap}>
                                <SingleButton title="清除" action="清除" icon="#icon-qingchu" />
                                <SingleButton title="格式刷" action="格式刷" icon="#icon-geshishua" />
                            </div>
                        </ToolItem>
                        <ToolItem>
                            <div className={classes.wrap}>
                                <Select type="noIcon" action="字体" data={data.ziti} />
                                <Select type="noIcon" action="字号" data={data.zihao} />
                                <SingleButton title="加粗" action="加粗" icon="#icon-jiacu" />
                                <SingleButton title="倾斜" action="倾斜" icon="#icon-qingxie" />
                                <SingleButton title="下划线" action="下划线" icon="#icon-xiahuaxian" />
                                <ColorButton title="文字横线" action="文字横线" icon="#icon-wenzitianchong" />
                                <ColorButton title="文字颜色" action="文字颜色" icon="#icon-wenziyanse" />
                            </div>
                        </ToolItem>
                        <ToolItem>
                            <div className={classes.wrap}>
                                <IconButton title="边框设置" action="边框设置" icon="#icon-youbiankuang" />
                                <Select type="icon" action="垂直对齐" data={data.cuizhiduiqi} />
                                <Select type="icon" action="水平对齐" data={data.shuipingduiqi} />
                                <IconButton title="页边距" action="页边距" icon="#icon-yebianju" />
                                <IconButton title="纸张方向" action="纸张方向" icon="#icon-zhizhangfangxiang" />
                                <IconButton title="纸张大小" action="纸张大小" icon="#icon-zhizhangdaxiao" />
                            </div>
                        </ToolItem>
                        <ToolItem>
                            <div className={classes.wrap}>
                                <SingleButton title="设置表头" action="设置表头" icon="#icon-shezhibiaotou" />
                                <SingleButton title="取消设置" action="取消设置" icon="#icon-quxiaobiaotou" />
                                <SingleButton title="隐藏行列" action="隐藏行列" icon="#icon-yincanghanglie" />
                                <SingleButton title="显示行列" action="显示行列" icon="#icon-xianshihanglie" />
                            </div>
                        </ToolItem>
                        <ToolItem>
                            <div className={classes.wrap}>
                                <SingleButton title="FX" action="FX" icon="#icon-FX" />
                                <SingleButton title="插图" action="插图" icon="#icon-chatu" />
                                <SingleButton title="数据引用" action="数据引用" icon="#icon-shujuyinyong" />
                            </div>
                        </ToolItem>
                        <ToolItem>
                            <div>
                                <SingleButton title="打印" action="打印" icon="#icon-dayin" />
                            </div>
                        </ToolItem>
                    </ToolGroup>
                </Toolbar>
            </Header>
            <Main>
                <FromPaper />
                {/* <FromPaper size={{width: 1024, height: 500}} margin={{top: 100, left: 100, right: 100, bottom: 100}} />
                <FromPaper size={{width: 1024, height: 1024}} margin={{top: 100, left: 100, right: 100, bottom: 100}} /> */}
                {/* <HitableCanvasWrapper debug={isDebug} width={1024} height={768}>
                    <Group>
                        {items.map((item, i) => <Line key={item} startX={0} startY={i * 30} endX={500} endY={i * 30} options={LINE_OPTIONS} />)}
                        {items.map((item, i) => <Text key={item} text={item.toString()} x={0} y={i * 30} width={100} height={30} options={TEXT_OPTIONS} />)}
                        <Image url="http://192.168.13.238:8081/static/rapture/resources/icons/x32/nexus-white.png?_v=3.18.1-01&_e=OSS" x={0} y={0} width={50} height={50} />
                        <Image url="http://192.168.13.238:8081/static/rapture/resources/icons/x32/nexus-white.png?_v=3.18.1-01&_e=OSS" x={50} y={50} width={50} height={50} options={{background: "black"}} />
                    </Group>

                </HitableCanvasWrapper> */}
            </Main>
            <Footer />
        </FullPage>
    );
};

export default App;
