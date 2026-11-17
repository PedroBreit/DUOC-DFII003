import { graphql } from 'msw/graphql';
import { HttpResponse } from 'msw/http';
import { vuelos, hoteles } from './viajes';

const graphqlAPI = graphql.link(
  `${import.meta.env.BASE_URL}graphql`
);

export const graphqlHandlers = [
  // Consultar vuelos según el destino
  graphqlAPI.query('GetFlightsByDestination', ({ variables }) => {
    const { destinoId } = variables;

    const resultado = vuelos.filter(
      (vuelo) => vuelo.destinoId === destinoId
    );

    return HttpResponse.json({
      data: {
        vuelos: resultado,
      },
    });
  }),

  // Consultar hoteles según el destino
  graphqlAPI.query('GetHotelsByDestination', ({ variables }) => {
    const { destinoId } = variables;

    const resultado = hoteles.filter(
      (hotel) => hotel.destinoId === destinoId
    );

    return HttpResponse.json({
      data: {
        hoteles: resultado,
      },
    });
  }),
];
