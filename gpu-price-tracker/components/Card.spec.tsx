import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "./Card";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

describe("<Card />", () => {
  describe("The Card component", () => {
    // async function sendMessage() {
    const user = userEvent.setup();

    const mockData = {
      image:
        "https://img.gigatron.rs/img/products/medium/image615d8cb4c4e5d.png",
      brand: "Palit",
      title:
        "PALIT GeForce RTX 3060 Ti Dual LHR 8GB GDDR6 256-bit NE6306T019P2-190AD",
      price: "79999.00",
    };
    render(<Card data={mockData} />);
    // await user.type(
    //   screen.getByTestId('cardImage'),
    //   'New message',
    // );
    test("has correct image src", () => {
      expect(screen.getByTestId("cardImage")).toHaveAttribute(
        "src",
        expect.stringContaining("gigatron")
      );
    }),
      test('link "button" exists', () => {
        expect(screen.queryByTestId("cardBuyLink")).to;
      });
    test("buy button redirects to product page", async () => {
      await screen.findByTestId('cardBuyLink')
      // await user.click(await screen.findByTestId('cardBuyLink'));
      // expect(window.location.assign).toHaveBeenCalledWith("/product/");
    });

    // }

    // it('clears the text field', async () => {
    //   await sendMessage();
    //   expect(screen.getByTestId('messageText').value).toEqual('');
    // });
  });
});
