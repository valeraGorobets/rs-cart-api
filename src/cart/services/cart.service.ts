import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Cart } from '../models';
import { Client } from 'pg';
import { PG_CLIENT_CONFIG } from '../../shared/variables';

@Injectable()
export class CartService {
  public async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  public async findByUserId(userId: string): Promise<Cart> {
    const client: Client = new Client(PG_CLIENT_CONFIG);
    await client.connect();

    try {
      const queryResult = await client.query({
        text: 'SELECT * FROM carts c JOIN cart_items ci ON c.id = ci.cart_id WHERE c.user_id = $1',
        values: [userId],
      });

      const cart = queryResult.rows[0];

      return cart && {
        id: cart.id,
        items: queryResult.rows.map(row => ({
          count: row.count,
          product: {
            id: row.product_id,
          },
        })),
      };
    } finally {
      await client.end();
    }
  }

  public async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const client: Client = new Client(PG_CLIENT_CONFIG);
    await client.connect();

    try {
      const { id, ...rest } = await this.findOrCreateByUserId(userId);

      const updatedCart = {
        id,
        ...rest,
        items: [...items],
      };

      await Promise.all(items.map(item => client.query({
        text: `INSERT INTO cart_items (cart_id, product_id, count) VALUES ($1, $2, $3)`,
        values: [id, item.product.id, item.count],
      })));

      return { ...updatedCart };
    } finally {
      await client.end();
    }
  }

  public async removeByUserId(userId: string): Promise<void> {
    const client: Client = new Client(PG_CLIENT_CONFIG);
    await client.connect();

    try {
      await client.query({
        text: `DELETE FROM carts WHERE user_id = $1`,
        values: [userId],
      });
    } finally {
      await client.end();
    }
  }

  private async createByUserId(userId: string): Promise<Cart> {
    const client: Client = new Client(PG_CLIENT_CONFIG);
    await client.connect();

    try {
      const id = v4(v4());
      const createdAt = new Date().toISOString().split('T')[0];
      await client.query({
        text: 'INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES ($1,$2,$3,$4,$5 ) RETURNING id',
        values: [id, userId, createdAt, createdAt, 'OPEN'],
      });

      return {
        id,
        items: [],
      };
    } finally {
      await client.end();
    }
  }
}
