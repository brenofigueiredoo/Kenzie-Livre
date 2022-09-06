import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Box from "../../components/Box";
import { ButtonAll } from "../../components/Button";
import CardExtra from "../../components/cardExtra";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TransitionPage from "../../components/TransitionPage";
import { useRequest } from "../../Context/Request";

import {
  ContainerProduct,
  DivImageProduct,
  ProductInfo,
  ProductStyle,
} from "./style";

const Product = () => {

  const navigate = useNavigate()

  const { SearchProductId } = useRequest()
  const { id } = useParams()

  const [ product, setProduct ] = useState<any>()

  useEffect(()=>{

    SearchProductId( Number( id ) )
      .then( result => setProduct( result ) )
      .catch( error => console.log( error ) )

  },[])

  const user = JSON.parse( localStorage.getItem("@KenzieLivre:User") as string )

  const addCart = () => {

    const arrayCart = JSON.parse( localStorage.getItem( "@KenzieLivre:Cart" ) as string )
    arrayCart.push( product )

    console.log( arrayCart )

    localStorage.setItem( "@KenzieLivre:Cart", JSON.stringify( arrayCart ) )

    toast.success("Produto adicionado")
  }

  const addGoCart = () => {
    addCart()
    navigate("/cart")
  }

  return (
    <TransitionPage>
      <ProductStyle>
        <Header onText={() => {}} />
        <ContainerProduct>
          <DivImageProduct>
            <div className="miniImage">
              {
                product?.images?.map( ( image:any )=> 
                  <CardExtra
                    type="imgExtraProduct"
                    alt={ product.model }
                    src={image}
                  />
                  
                )
              }
            </div>
            <div className="mainImage">
              <img
                src={product && product?.images[0] }
                alt={product && product?.model}
              />
            </div>
          </DivImageProduct>
          <Box width="615px" MediaQuery="768px">
            <ProductInfo>
              <div className="topInfo">
                <p className="newProduct">Novo</p>
                <h2 className="titleProduct">
                  { product && product?.description }
                </h2>
                <p className="priceProduct">R$ { product && product?.currentPrice }</p>
                <p className="stockProduct">
                  {product && product?.quantity ? "Estoque disponivel" : "Estoque indisponivel"}
                  </p>
                <p className="quantityProduct">
                  Quantidade: <p> { product && product?.quantity } unidade</p>
                </p>
              </div>
              <div className="buttonsProduct">
                <ButtonAll
                  onCLick={addGoCart}
                  background="deft"
                  size="medium"
                  children="Comprar"
                  type="submit"
                />
                <ButtonAll
                  onCLick={addCart}
                  background="transp"
                  size="medium"
                  children="Adicionar ao carrinho"
                  type="submit"
                />
                {product?.userId === user.id&&<ButtonAll
                  onCLick={()=>navigate(`/updateProduct/${product.id}`)}
                  background="transp"
                  size="medium"
                  children="Atualizar Produto"
                  type="submit"
                />}
                {product?.userId === user.id&&<ButtonAll
                  onCLick={()=>{}}
                  background="transp"
                  size="medium"
                  children="Excluir Produto"
                  type="submit"
                />}
              </div>
              <div className="technicalProduct">
                <h2 className="heTechnical">Características</h2>
                <div className="tableTechnical">
                  <table>
                    <tr>
                      <th className="thDark">Marca</th>
                      <td className="tdDark">{product && product?.brand }</td>
                    </tr>
                    <tr>
                      <th className="thLight">Modelo</th>
                      <td className="tdLight">{product && product?.model }</td>
                    </tr>
                    <tr>
                      <th className="thDark">Cor</th>
                      <td className="tdDark">{product && product?.color }</td>
                    </tr>
                    <tr>
                      <th className="thLight">Garantia</th>
                      <td className="tdLight">{product && product?.warranty }</td>
                    </tr>
                  </table>
                </div>
              </div>
            </ProductInfo>
          </Box>
        </ContainerProduct>
      </ProductStyle>
      <Footer />
    </TransitionPage>
  );
};
export default Product;
