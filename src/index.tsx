import vixi from "./engine/index"
import state from "@state"
import Obstacle from "@assets/obstacle.png"

const view = document.getElementById("container") as HTMLCanvasElement

class Test extends vixi.Component {
    state = {
        rotation: 0,
    }

    onTick(delta: number) {
        this.state.rotation += delta * 0.05
    }
    onClick = () => {
        this.state.rotation += 0.5
    }

    render() {
        const sprites = [
            {
                click: this.onClick,
                x: 15,
                y: 100,
                rotation: this.state.rotation,
                texture: Obstacle,
            },
        ]

        return (
            <group>
                {/* simple sprite */}
                <sprite
                    click={this.onClick}
                    x={15}
                    y={100}
                    rotation={this.state.rotation}
                    texture={Obstacle}
                />
                {/* sprite that should not be rendered */}
                <sprite
                    render={false}
                    click={this.onClick}
                    x={350}
                    y={100}
                    rotation={this.state.rotation}
                    texture={Obstacle}
                />
                {/* Component inside component example */}
                {/* groups can be nested */}
                <group>
                    <sprite
                        render={false}
                        click={this.onClick}
                        x={550}
                        y={100}
                        rotation={this.state.rotation}
                        texture={Obstacle}
                    />
                </group>
                {/* Dynamic list like particles */}
                <list data={sprites} component={Test} />
                {/* Text is supported but requires wrapping tags */}
                <text>Hello</text>
            </group>
        )
    }
}

vixi.render(Test, view)

if (module.hot) {
    module.hot.accept()
}
